const mongoose = require('mongoose');
const Book = require('./api/models/book');
const DBURL = 'mongodb://localhost/books';
if (process.env.DBURL) {
  DBURL = process.env.DBURL;
}
// If using Docker env, replace the DBURL by the following
class DB {
  constructor() {
    mongoose
      .connect(DBURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(
        () => {
          // mongoose.connection.db.dropDatabase();
          // console.log(mongoose.connection.db);
        
          console.log('connected To Db bookStore');
        },
        err => {
          console.log(err);
        }
      );
  }
}
module.exports = DB;
