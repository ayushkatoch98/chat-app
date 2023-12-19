import express from 'express';

import { signup } from '../controllers/authController.js';

const router = express.Router();

export default () => {
  
  router.get('/signup', signup);

  return router;
};