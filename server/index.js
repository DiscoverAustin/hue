const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const nodemailer = require('nodemailer');
const morgan = require('morgan');

const helpers = require('./helpers');
const db = require('../database/index');
const insert = require('../database/inserts');
const query = require('../database/queries');
const deletes = require('../database/deletes');
const loginEmail = require('./emailTemplates/welcome/welcome');

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

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));
app.use(session({secret: 'dont hack me brah', name: 'betterHue'}));


app.get('/entries', (req, res) => {
  query.entries().then(data => {res.json(data)});
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
  let userid = req.query.id;
  query.commentsByUser(userid).then(data => {res.json(data)});
})

app.get('/entry', (req, res) => {
  let entryid = req.query.id;
  query.entry(entryid).then(data => {res.json(data)});
});

app.post('/entries', helpers.checkUser, (req, res) => {
  let entry = req.body;
  entry.user = req.session.user;
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



/************************************************************/
/************************************************************/

let port = process.env.PORT || 1234;

app.listen(port, () => console.log(`Listening on port ${port}!`))
