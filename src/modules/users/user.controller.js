
const User = require('./user.model');
const { registerSchema, loginSchema } = require('./user.validation');
const { hashPassword, comparePassword } = require('./password');
const jwt = require('jsonwebtoken');
const env = require('../../config/env');

// Register a new KoboMarket user
const registerUser = async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.details.map((detail) => detail.message)
      });
    }

    const { firstName, lastName, email, phone, password } = value;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists.'
      });
    }

    const passwordHash = await hashPassword(password);

    const user = await User.create({
      firstName,
      lastName,
      email,
      ...(phone ? { phone } : {}),
      passwordHash,
      role: 'buyer',
      accountStatus: 'pending'
    });

    return res.status(201).json({
      success: true,
      message: 'Registration successful.',
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          role: user.role,
          accountStatus: user.accountStatus,
          createdAt: user.createdAt
        }
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyPattern || {})[0];

      return res.status(409).json({
        success: false,
        message: duplicateField === 'phone'
          ? 'This phone number is already registered.'
          : 'This email address is already registered.'
      });
    }

    console.error('Registration error:', error);

    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred during registration.'
    });
  }
};

// Login an existing KoboMarket user
const loginUser = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.details.map((detail) => detail.message)
      });
    }

    const { email, password } = value;

    // Include passwordHash because the model hides it by default.
    const user = await User.findOne({ email }).select('+passwordHash');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const passwordIsValid = await comparePassword(
      password,
      user.passwordHash
    );

    if (!passwordIsValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    if (user.accountStatus === 'suspended') {
      return res.status(403).json({
        success: false,
        message: 'Your account has been suspended.'
      });
    }

    // Generate a short-lived access token.
    const accessToken = jwt.sign(
      {
        userId: user._id.toString(),
        role: user.role
      },
      env.jwtAccessSecret,
      {
        expiresIn: env.jwtAccessExpiresIn
      }
    );

    user.lastLoginAt = new Date();
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          role: user.role,
          accountStatus: user.accountStatus
        },
        accessToken,
        tokenType: 'Bearer',
        expiresIn: env.jwtAccessExpiresIn
      }
    });
  } catch (error) {
    console.error('Login error:', error);

    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred during login.'
    });
  }
};

module.exports = {
  registerUser,
  loginUser
};
