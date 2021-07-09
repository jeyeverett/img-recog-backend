const redis = require('redis');

// Setup Redis
const redisClient = redis.createClient(process.env.REDIS_URI);

module.exports.requireAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    redisClient.get(authorization.split(' ')[1], (err, reply) => {
      if (err || !reply) {
        return res
          .status(401)
          .json({ message: 'Unauthorized - Access Denied.' });
      }
      return next();
    });
  } else {
    return res.status(401).json({ message: 'Unauthorized - Access Denied.' });
  }
};
