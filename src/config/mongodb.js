
const mongoose = require('mongoose');
const env = require('./env');

const connectMongoDB = async () => {
  if (!env.mongoUri) {
    throw new Error('MONGODB_URI is missing from your .env file');
  }

  await mongoose.connect(env.mongoUri);

  console.log('MongoDB connected successfully');
};

module.exports = connectMongoDB;
