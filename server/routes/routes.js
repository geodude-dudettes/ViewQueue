import express from 'express';
import controller from '../controllers/controller';

const router = express.Router();

router.get('/', controller.allMedia, (req, res) => {
  return res.status(200).send();
});

router.post('/', controller.createMedia, (req, res) => {
  return res.status(200).send();
});

router.patch('/:id', controller.editMedia, (req, res) => {
  return res.status(200).send();
});

router.delete('/:id', controller.deleteMedia, (req, res) => {
  return res.status(200).json();
});
