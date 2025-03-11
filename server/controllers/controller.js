import db from '../models/model';

const Controller = {};

Controller.allMedia = (req, res, next) => {
    db.query('SELECT * FROM media')
    .then((result) => {
        res.locals.media = result
        return next()
    })
    .catch((err) => next(err));
};

// watch list (to be discussed)
// favorite list
// media list

Controller.createMedia = (req, res, next) => {};

Controller.editMedia = (req, res, next) => {};

Controller.deleteMedia = (req, res, next) => {};

export default Controller;
