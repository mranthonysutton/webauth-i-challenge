module.exports = (req, res, next) => {
  // checks if their is a valid session and a valid user
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ error: "You do not have access." });
  }
};
