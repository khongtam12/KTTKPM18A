import express from 'express';
import { forwardRequest } from '../utils/proxy.js';

const router = express.Router();

const FOOD_SERVICE = 'http://172.16.56.228:8082';

router.use('/', (req, res) => {
  forwardRequest(req, res, FOOD_SERVICE);
});

export default router;