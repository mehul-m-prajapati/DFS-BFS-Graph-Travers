const { check } = require('express-validator');

const validateSignup = [
  check('username')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters'),
  check('email')
    .isEmail()
    .withMessage('Enter a valid email'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

module.exports = { validateSignup };
