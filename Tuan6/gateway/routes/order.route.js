import express from 'express';
import { forwardRequest } from '../utils/proxy.js';
import { checkAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

const ORDER_SERVICE = 'http://172.16.62.118:8083';

// cần login mới tạo order
router.use('/', checkAuth, (req, res) => {
  forwardRequest(req, res, ORDER_SERVICE);
});

export default router;