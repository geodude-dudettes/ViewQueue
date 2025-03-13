import express from 'express';
import controller from '../controllers/controller';

/**
 * Importing the Express Framework:
 * Create a new router instance using Express
 * This `router` object will be used to define and organize routes
 * It helps modularize route handling instead of defining everything in `server.js`
 * Requests matching these routes will be directed to the appropriate controller functions
 */
const router = express.Router();

router.get('/', controller.allMedia, (req, res) => {
  return res.status(200).json(res.locals.media);
});

/* No need for end user to create data on their own */
// router.post('/', controller.createMedia, (req, res) => {
//   return res.status(200).send(`Successfully added query: ${res.locals.postMedia}`);
// });

/* Patch Requests for adding to and removing from Watch List */
router.patch('/:id', controller.toWatch, (req, res) => {
  return res.status(200).json(res.locals.addToWatch);
});

router.patch('/:id', controller.notWatch, (req, res) => {
  return res.status(200).json(res.locals.removeWatch);
});

// stretch feature: adding a delete operation