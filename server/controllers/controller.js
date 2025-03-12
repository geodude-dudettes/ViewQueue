import db from '../models/model';

const Controller = {};

// We'll have to hand populate the data using this method
Controller.allMedia = (req, res, next) => {
  db.query('SELECT * FROM media;')
    .then((result) => {
      res.locals.media = result.rows;
      return next();
    })
    .catch((err) => next(err));
};

// watch list (to be discussed)
// favorite list
// media list

// // just in case the user wants to create data in the future :)
// Controller.createMedia = (req, res, next) => {
//     const { id, title, type, genre, year, description, img_url, favorite, watch_list } = req.body;

//     const query = `
//         INSERT INTO media (id, title, type, genre, year, description, img_url, favorite, watch_list)
//         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9 )
//         RETURNING *;
//         `;

//     db.query(query, [id, title, type, genre, year, description, img_url, favorite, watch_list])
//     .then((result) => {
//         res.locals.createdMedia = result.row[0]
//         return next()
//     })
//     .catch((err) => next(err));
// };

// make single middleware for watch list
// favorite is separate

Controller.editMedia = (req, res, next) => {
  const { id } = req.params;

  const query = `UPDATE media SET watch_list = TRUE WHERE id = $1
RETURNING *;`;

  db.query(query, [id])
    .then((result) => {
      res.locals.updatedMedia = result.rows[0];
      return next();
    })
    .catch((err) => next(err));
};

// deleting from watch list
// just change it to false
Controller.deleteMedia = (req, res, next) => {};

export default Controller;
