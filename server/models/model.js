import pkg from 'pg';
const { Pool } = pkg;
import {} from 'dotenv/config';
// dotenv.config();

console.log(process.env.SECRET_KEY);
const URI = process.env.SECRET_KEY;

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: URI,
});

pool
  .connect()
  .then(() => {
    console.log('successfully connected to db!');
  })
  .catch((err) => {
    console.error('failed to connect to db;', err);
  });

export default {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};

// controller file:
// import db from 'model.js';

// inside a middleware function:
//
//const { title } = req.body;
//title is 'Spirited Away';
//const param = [title];
// so then, param = ['Spirited Away'];
// const queryCommand = "SELECT * from movies where title = $1;";
// db.query(queryCommand, param);
// 'SELECT * from movies where title = 'Spirited Away';
// .then((data) => {});
