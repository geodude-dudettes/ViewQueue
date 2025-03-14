import express from 'express';
import controller from '../controllers/controller.js';

/**
 * Importing the Express Framework:
 * Create a new router instance using Express
 * This `router` object will be used to define and organize routes
 * It helps modularize route handling instead of defining everything in `server.js`
 * Requests matching these routes will be directed to the appropriate controller functions
 */
const router = express.Router();

router.get('/media/:title', controller.searchTitles, (req, res) => {
  return res.status(200).json(res.locals.searchResults);
  });

router.get('/media', (req, res, next) => {console.log('inside router.get'); return next()}, controller.allMedia, (req, res) => {
  return res.status(200).json(res.locals.media);
});

// For the WatchList page
router.get('/watchlist', controller.watchlist, (req, res) => {
  return res.status(200).json(res.locals.toWatch);
  } )

/* No need for end user to create data on their own */
// router.post('/', controller.createMedia, (req, res) => {
//   return res.status(200).send(`Successfully added query: ${res.locals.postMedia}`);
// });

/* Patch Requests for adding to and removing from Watch List */
router.patch('/:id/add', controller.toWatch, (req, res) => {
  return res.status(200).json(res.locals.addToWatch);
});

// router.patch('/:id/remove', controller.notWatch, (req, res) => {
//   return res.status(200).json(res.locals.removeWatch);
// });

router.patch('/watchlist/:id/', controller.notWatch, (req, res) => {
  return res.status(200).json(res.locals.removeWatch);
});

// stretch feature: adding a delete

export default router;