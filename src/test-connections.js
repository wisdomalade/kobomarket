
const mongoose = require('mongoose');
const db = require('./config/postgres');

const testConnections = async () => {
  try {
    // Test PostgreSQL
    const result = await db.raw(
      'SELECT current_database() AS database, version() AS version'
    );

    console.log('POSTGRESQL CONNECTED');
    console.log('Database:', result.rows[0].database);
    console.log('Version:', result.rows[0].version);

    // Test MongoDB Atlas
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('MONGODB CONNECTED');
    console.log('Database:', mongoose.connection.name);

  } catch (error) {
    console.error('CONNECTION ERROR:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    await db.destroy();
  }
};

require('dotenv').config();
testConnections();
