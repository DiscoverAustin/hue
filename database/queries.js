const knex = require('./index');

const user = (name) => {
  return knex('users').where({name: name})
}

const usernameByEmail = (email) => {
  return knex('users')
  .where({email})
  .select('users.name');
}

const entries = () => {
  return knex('entries')
  .join('users', 'entries.userid', '=', 'users.id')
  .select('entries.id', 'entries.up_votes', 'entries.down_votes', 'entries.url', 'entries.title', 'entries.text', 'entries.created_at', 'users.name')
  .orderBy('entries.created_at', 'desc');
}

const entry = (entryid) => {
  return knex('entries')
  .where({'entries.id': entryid})
  .join('users', 'entries.userid', '=', 'users.id')
  .select('entries.id', 'entries.url', 'entries.title', 'entries.text', 'entries.created_at', 'users.name', 'entries.down_votes', 'entries.up_votes');
}

const comments = (entryid) => {
  return knex('comments')
  .where({entryid: entryid})
  .join('users', 'comments.userid', '=', 'users.id')
  .select('comments.id', 'comments.text', 'comments.created_at', 'users.name', 'down_votes', 'up_votes');
}

const entriesByUser = name => {
  let userid = knex('users').where({name: name}).select('id');
  return knex('entries')
  .where({userid: userid})
  .join('users', 'entries.userid', '=', 'users.id')
  .select('entries.id', 'entries.url', 'entries.title', 'entries.text', 'entries.created_at', 'users.name', 'entries.down_votes', 'entries.up_votes');
}

const commentsByUser = name => {
  let userid = knex('users').where({name: name}).select('id');
  return knex('comments')
  .where({userid: userid})
  .join('users', 'comments.userid', '=', 'users.id')
  .select('comments.id', 'comments.text', 'comments.created_at', 'comments.entryid', 'users.name', 'comments.down_votes', 'comments.up_votes');
}

const updatePassword = (name, password) => {
  return knex('users')
  .where({name})
  .update('password', password)
}
/************************************************************/
// Prestige (karma) queries
/************************************************************/

const getEntryVotes = (entryid) => {
  return knex('entries')
  .where({'entries.id': entryid})
  .select('entries.up_votes', 'entries.down_votes');
}

const getCommentVotes = (commentid) => {
  return knex('comments')
  .where({'comments.id': commentid})
  .select('comments.up_votes', 'comments.down_votes');
}

const checkEntryVote = (userid, entryid) => {
  return knex('entries_votes')
  .where({userid: userid, entryid: entryid})
  .select('entries_votes.voted')
}

const checkCommentVote = (userid, commentid) => {
  return knex('comments_votes')
  .where({userid: userid, commentid: commentid})
  .select('comments_votes.voted')
}

/************************************************************/
/************************************************************/

module.exports = {
  user,
  entries,
  entry,
  comments,
  entriesByUser,
  commentsByUser,
  getEntryVotes,
  getCommentVotes,
  checkEntryVote,
  checkCommentVote,
  usernameByEmail,
  updatePassword
};
