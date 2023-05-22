const auth = (req, res, next) => {
  let login = false;
  if (login) {
    next();
  } else {
    res.status(401).json({ message: 'User Not Exist.' });
  }
};

module.exports = auth;
