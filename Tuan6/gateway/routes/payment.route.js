import express from 'express';
import { forwardRequest } from '../utils/proxy.js';
import { checkAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

const PAYMENT_SERVICE = 'http://172.16.59.92:8084';

router.use('/', checkAuth, (req, res) => {
  forwardRequest(req, res, PAYMENT_SERVICE);
});

export default router;