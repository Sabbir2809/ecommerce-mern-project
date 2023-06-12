const jwt = require('jsonwebtoken');

exports.createJSONWebToken = async (payload, secretKey, expiresIn) => {
  // error handling
  if (typeof payload !== 'object' || !payload) {
    throw new Error('Payload must be a non-empty object');
  }
  if (typeof secretKey !== 'string' || secretKey === '') {
    throw new Error('Secret key must be a non empty string');
  }
  try {
    // create token
    const token = jwt.sign(payload, secretKey, { expiresIn });
    return token;
  } catch (error) {
    console.error('Fail to sign to JWT: ', error.toString());
    throw error;
  }
};
