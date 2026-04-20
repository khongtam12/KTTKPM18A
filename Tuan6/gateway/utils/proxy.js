import axios from 'axios';

export const forwardRequest = async (req, res, targetBaseUrl) => {
  try {
    const url = `${targetBaseUrl}${req.originalUrl}`;

    const response = await axios({
      method: req.method,
      url,
      data: req.body,
      headers: {
        Authorization: req.headers.authorization || '',
        'Content-Type': 'application/json'
      }
    });

    res.status(response.status).json(response.data);

  } catch (error) {
    console.error('Gateway error:', error.message);

    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Gateway error'
    });
  }
};