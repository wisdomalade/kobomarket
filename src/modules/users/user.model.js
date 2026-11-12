
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 254
    },

    phone: {
      type: String,
      trim: true,
      sparse: true,
      unique: true
    },

    // Store only the hashed password, never the plain password.
    passwordHash: {
      type: String,
      required: true,
      select: false
    },

    role: {
      type: String,
      enum: ['buyer', 'vendor', 'admin'],
      default: 'buyer'
    },

    accountStatus: {
      type: String,
      enum: ['pending', 'active', 'suspended'],
      default: 'pending'
    },

    emailVerifiedAt: {
      type: Date,
      default: null
    },

    lastLoginAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.passwordHash;
        return ret;
      }
    }
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
