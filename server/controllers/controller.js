import db from '../models/model.js';

/*
 * An error helper function to ensure consistent formatting of error logs
 * before it passes to the global error handler
 */
const createError = ({ log, status = 500, message }) => {
  return { log, status, message };
};

/* This is the object that contains all of the methods */
const Controller = {};

/** retrieve all the media */
Controller.allMedia = (req, res, next) => {
  const queryCommand = 'SELECT * FROM media;';
  db.query(queryCommand)
    .then((result) => {
      res.locals.media = result.rows;
      return next();
    })
    .catch((err) => {
      /* The 'error' variable stores the evaluated result of the createError helper function */
      const error = createError({
        log: `Error occurred: ${err}`,
        status: 500,
        message: { err: 'Failure to retrieve all media from database' },
      });
      return next(error); // passes the formatted error to the global error handler
    });
};

Controller.searchTitles = (req, res, next) => {
  const queryCommand = 'SELECT * FROM media WHERE title ILIKE $1;';
  // the query is now case-insensitive (because of ILIKE)
  const { title } = req.params;
  const titleFull = `%${title}%`;
  // titleFull now stores the wildcards in front and back of user's search input in case they only input a partial search, it will still return any results that contain the partial search

  db.query(queryCommand, [titleFull])
    .then((result) => {
      res.locals.searchResults = result.rows;
      return next();
    })
    .catch((err) => {
      console.log('search string', title);
      const error = createError({
        log: `Error occurred: ${err}`,
        status: 500,
        message: { err: 'Failure to retrieve any data from database' },
      });
      return next(error); // passes the formatted error to the global error handler
    });
};

/*
 * Just in case the user wants to create data in the future :)
 * End users can hand populate the data using this method.
 */
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

/*
 * This is the middleware design solely for adding or removing media from watch list
 */

/* adding media to watch list using UPDATE operation */
Controller.toWatch = (req, res, next) => {
  const { id } = req.params;

  const query = `UPDATE media SET watch_list = TRUE WHERE id = $1
RETURNING *;`;

  db.query(query, [id])
    .then((result) => {
      res.locals.addToWatch = result.rows[0];
      return next();
    })
    .catch((err) => {
      const error = createError({
        log: `Error occurred: ${err}`,
        status: 500,
        message: { err: 'Failed to ADD media query to watch list' },
      });
      return next(error);
    });
};

/* Remove media from watch list using UPDATE operation once more */
Controller.notWatch = (req, res, next) => {
  const { id } = req.params;

  const query = `UPDATE media SET watch_list = FALSE WHERE id = $1
  RETURNING *;`;

  db.query(query, [id])
    .then((result) => {
      res.locals.removeWatch = result.rows[0];
      return next();
    })
    .catch((err) => {
      const error = createError({
        log: `Error occurred: ${err}`,
        status: 500,
        message: { err: 'Failed to REMOVE media query from watch list' },
      });
      return next(error);
    });
};

export default Controller;
