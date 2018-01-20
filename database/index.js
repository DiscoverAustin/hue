// const config = require('../config');

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : process.env.DATABASE_URL || '127.0.0.1',
    user : process.env.DATABASE_USER || '',
    password : process.env.DATABASE_PASSWORD || '',
    database : process.env.DATABASE_NAME ||  'hue'
  }
});
console.log('process.env: ', process.env);

// const knex = require('knex')(config);

knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    knex.schema.createTable('users', function (table) {
      table.increments();
      table.string('name').unique();
      table.string('password');
      table.string('avatar_name');
      table.string('email');
      table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
      table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'))
    }).then(function (table) {
      console.log('Created Table users');
    });
  }
}).then(function(){
  knex.schema.hasTable('entries').then(function(exists) {
    if (!exists) {
      knex.schema.createTable('entries', function (table) {
        table.increments();
        table.integer('up_votes').defaultTo(0);
        table.integer('down_votes').defaultTo(0);
        table.string('title');
        table.string('url');
        table.text('text');
        table.integer('userid').references('users.id');
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
        table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'))
      }).then(function (table) {
        console.log('Created Table entries');
      });
    }
  });
}).then(function(){
  knex.schema.hasTable('comments').then(function(exists) {
    if (!exists) {
      knex.schema.createTable('comments', function (table) {
        table.increments();
        table.integer('up_votes').defaultTo(0);
        table.integer('down_votes').defaultTo(0);
        table.text('text');
        table.integer('userid').references('users.id');
        table.integer('entryid').references('entries.id');
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
        table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'))
      }).then(function (table) {
        console.log('Created Table comments');
      });
    }
  });
}).then(function(){
  knex.schema.hasTable('comments_votes').then(function(exists) {
    if (!exists) {
      knex.schema.createTable('comments_votes', function(table) {
        table.increments();
        table.string('voted');
        table.string('userid').references('users.name');
        table.integer('entryid').references('entries.id');
        table.integer('commentid').references('comments.id');
      }).then(function(table) {
        console.log('Created Table comments_votes');
      })
    }
  })
}).then(function() {
  knex.schema.hasTable('entries_votes').then(function(exists) {
    if (!exists) {
      knex.schema.createTable('entries_votes', function(table) {
        table.increments();
        table.string('voted');
        table.string('userid').references('users.name');
        table.integer('entryid').references('entries.id');
      }).then(function(table) {
        console.log('Created Table entries_votes');
      })
    }
  })
});

module.exports = knex;
