import express from 'express';
import controller from '../controllers/controller';

const router = express.Router();

router.get('/', controller.allMedia, (req, res) => {
  return res.status(200).send(`Successfully retireved all media queries!`);
});

router.post('/', controller.createMedia, (req, res) => {
  return res.status(200).send(`Successfully added query: ${res.locals.postMedia}`);
});

router.patch('/:id', controller.editMedia, (req, res) => {
  return res.status(200).send(`Successfully updated query: ${res.locals.postMedia}`);
});

router.delete('/:id', controller.deleteMedia, (req, res) => {
  return res.status(200).json(`Successfully deleted query: ${res.locals.postMedia}`);
});
