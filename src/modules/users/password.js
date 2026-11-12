
const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 12;

// Convert a plain-text password into a secure hash.
const hashPassword = async (password) => {
  if (typeof password !== 'string' || password.length < 8) {
    throw new Error('Password must be at least 8 characters long.');
  }

  return bcrypt.hash(password, SALT_ROUNDS);
};

// Compare a login password with the stored password hash.
const comparePassword = async (password, passwordHash) => {
  if (
    typeof password !== 'string' ||
    typeof passwordHash !== 'string'
  ) {
    return false;
  }

  return bcrypt.compare(password, passwordHash);
};

module.exports = {
  hashPassword,
  comparePassword
};
