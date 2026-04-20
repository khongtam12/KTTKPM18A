import express from 'express';
import { forwardRequest } from '../utils/proxy.js';

const router = express.Router();

const USER_SERVICE = 'http://172.16.62.93:8081';

router.use('/', (req, res) => {
  forwardRequest(req, res, USER_SERVICE);
});

export default router;