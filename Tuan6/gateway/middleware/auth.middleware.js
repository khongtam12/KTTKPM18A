export const checkAuth = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    // Có thể verify JWT ở đây nếu muốn
    next();
  };