const mongoose = require('mongoose');
const Book = require('./api/models/book');
const DBURL = 'mongodb://localhost/books';
// If using Docker env, replace the DBURL by the following
// const DBURL = 'mongodb://root:root@127.0.0.1:27017/books?authSource=admin'
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
