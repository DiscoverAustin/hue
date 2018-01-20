const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const nodemailer = require('nodemailer');
const morgan = require('morgan');
const axios = require('axios');
const fs = require('fs');
const multer = require('multer');
// const storage = multer.diskStorage({
//   destination: (req, file, callback) {
//     callback(null, '.uploads');
//   },
//   filename: (req, file, callback) {
//     callback(null, )
//   }
// })
const upload = multer({ dest: 'userAvatars/' });
const path = require('path');

const helpers = require('./helpers');
const db = require('../database/index');
const insert = require('../database/inserts');
const query = require('../database/queries');
const deletes = require('../database/deletes');
const loginEmail = require('./emailTemplates/welcome/welcome');
const DIST_DIR = path.join(__dirname, '../client/dist');

const domain = 'http://localhost:1234';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'theworldsgreatesthue@gmail.com',
    pass: 'discoverAustin1!'
  }
});

const mailOptions = (email, username, endpoint) => ({
  from: 'no-reply@theworldsgreatesthue.com',
  to: email,
  subject: 'Welcome to Hue!',
  html: loginEmail(email, username, endpoint)
});

const sessionOptions = {
  secret: 'dont hack me brah',
  name: 'betterHue',
  saveUninitialized: true,
  resave: true
};

const app = express();

app.use(morgan('dev'));
app.use(bodyParser({limit: '15mb'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));
app.use(session(sessionOptions));

app.get('/api/getUserImage', (req, res) => {
  const { user } = req.query;
  res.sendFile(path.join(__dirname, `/userAvatars/${user}`));
});

app.get('*', (req, res, next) => {
  console.log('currentUser: ', req.session.user);
  next();
});

app.get('/entries', (req, res) => {
  console.log('/entries user: ', req.session);
  query.entries()
  .then(data => {res.json(data)})
  .catch((e) => {
    console.error(e)
    res.statusCode(500).end()
  });
});

app.get('/userEntries', (req, res) => {
  let userid = req.query.id;
  query.entriesByUser(userid).then(data => {res.json(data)});
})

app.get('/comments', (req, res) => {
  let entryid = req.query.entryid;
  query.comments(entryid).then(data => {res.json(data)});
});

app.get('/userComments', (req, res) => {
  let user = req.query.id;
  query.commentsByUser(user).then(data => {res.json(data)});
})

app.get('/entry', (req, res) => {
  let entryid = req.query.id;
  query.entry(entryid).then(data => {res.json(data)});
});

app.post('/entries', helpers.checkUser, (req, res) => {
  let entry = req.body;
  entry.user = req.session.user;
  // console.log('entry.user: ', req.session.user);
  if(entry.title === '' || ((entry.text === '') && (entry.url === 'none'))) {
    res.send('failure');
  }else{
    if(entry.url === 'none'){
      insert.textEntry(entry)
      .then(() => res.send('success'))
      .catch(() => res.send('failure'));
    }else{
      insert.entry(entry)
      .then(() => res.send('success'))
      .catch(() => res.send('failure'));
    }
  }
});

app.post('/comments', helpers.checkUser, (req, res) => {
  let comment = req.body;
  comment.user = req.session.user;
  insert.comment(comment);
  res.send('added comment');
});

app.delete('/entry', helpers.checkUser, (req, res) => {
  deletes.commentVotes(req.query.id).then(() => {
    deletes.entryVotes(req.query.id).then(() => {
      deletes.comments(req.query.id).then(() => {
        deletes.entry(req.query.id).then(data => {
          res.send('deleted entry')
        });
      })
    })
  })
});

app.delete('/comment', helpers.checkUser, (req, res) => {
  deletes.commentVotesByComment(req.query.id).then(() => {
    deletes.comment(req.query.id).then(data => {
      res.send('deleted comment')
    });
  })
});

/************************************************************/
// Prestige (karma) routes
/************************************************************/

app.get('/getEntryVotes', (req, res) => {
  let id = req.query.id;
  query.getEntryVotes(id).then((data) => {
    res.json(data)});
})

app.get('/getCommentVotes', (req, res) => {
  let id = req.query.id;
  query.getCommentVotes(id).then((data) => {
    res.json(data)});
})

app.post('/upVoteComment', helpers.checkUser, (req, res) => {
  let userid = req.query.user;
  let commentid = req.query.comment;
  let entryid = req.query.entry;
  helpers.checkCommentVote(userid, commentid, entryid, function(canVote) {
    if (canVote) {
      insert.upVoteComment(commentid).then((data) => {res.json(data)})
    } else {
      res.sendStatus(201)
    }
  })
})

app.post('/downVoteComment', helpers.checkUser, (req, res) => {
  let userid = req.query.user;
  let commentid = req.query.comment;
  let entryid = req.query.entry;
  helpers.checkCommentVote(userid, commentid, entryid, function(canVote) {
    if (canVote) {
      insert.downVoteComment(commentid).then((data) => {res.json(data)})
    } else {
      res.sendStatus(201)
    }
  })
})

app.post('/upVoteEntry', helpers.checkUser, (req, res) => {
  let userid = req.query.user;
  let entryid = req.query.entry;
  helpers.checkEntryVote(userid, entryid, function(canVote) {
    if (canVote) {
      insert.upVoteEntry(entryid).then((data) => {res.json(data)})
    } else {
      res.sendStatus(201)
    }
  })
})

app.post('/downVoteEntry', helpers.checkUser, (req, res) => {
  let userid = req.query.user;
  let entryid = req.query.entry;
  helpers.checkEntryVote(userid, entryid, function(canVote) {
    if (canVote) {
      insert.downVoteEntry(entryid).then((data) => {res.json(data)})
    } else {
      res.sendStatus(201)
    }
  })
})

/************************************************************/
// Authentication routes
/************************************************************/

app.post('/signup', (req, res) => {
  const { email, username } = req.body;
  const endpoint = `${domain}/api/verifyUser?username=${username}`;
  transporter.sendMail(mailOptions(email, username, endpoint), function(error, info){
    if (error) {
      console.error(error);
    } else {
      console.log('Email successfully sent: ' + info.response);
    }
  });

  helpers.hashPassword(req)
  .then(() => {
    helpers.createSession(req, function() {
      res.send('Congratulations! Welcome to hue.');
    })
	})
  .catch((e) => {
    console.error(e);
    res.send('Sorry that username already exists.');
  })
});

app.post('/login', (req, res) => {
  helpers.identifyUser(req)
  .then(() => {
    helpers.createSession(req, function() {
      res.send('Login successful');
    })
  })
  .catch((result) => {
    res.send(result);
  })
});

app.post('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('betterHue');
  res.send('Thanks for visiting!');
});

app.get('/submit', helpers.checkUser, (req, res) => {
  res.send(req.session);
})

/************************************************************/
// API routes
/************************************************************/
// #=/api/verifyUser?username=kendrick'
app.get('/api/verifyUser', (req, res) => {
  console.log('Verified User: ', req.query.username);
  res.redirect('/');
});

app.post('/api/uploadAvatar', upload.single('avatar'), (req, res) => {
  const { avatarUrl } = req.body;
  const imgData = avatarUrl.replace(/^data:image\/\w+;base64,/, "");
  const imgBuffer = new Buffer(imgData, 'base64');
  console.log('user?: ', req.session.user);
  const imgName = `${req.session.user}.png`
  fs.writeFile(`./server/userAvatars/${imgName}`, imgBuffer, (err) => {
    if (err) { console.error(err)
    } else {
      console.log(`${imgName} successfully saved!`);
    }
  });

// /api/getUserImage?user=${this.props.data.name}.png

  // console.log('req.file: ', req.file)
  // console.log('New Avatar: ', avatarUrl);
  // axios.get(avatarUrl)
  // .then((res) => {
  //   // console.log('res from new avatar: ', res);
  // })
  // .catch((e) => { console.error(e) });
})

/************************************************************/
/************************************************************/

let port = process.env.PORT || 1234;

app.listen(port, () => console.log(`Listening on port ${port}!`))
