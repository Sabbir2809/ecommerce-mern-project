const getUsers = (req, res, next) => {
  try {
    res.status(200).json({ message: 'User Information' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers };
