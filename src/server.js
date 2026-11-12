
require('dotenv').config();

const app = require('./app');
const env = require('./config/env');
const connectMongoDB = require('./config/mongodb');
const db = require('./config/postgres');
const mongoose = require('mongoose');

let server;

const startServer = async () => {
  try {
    console.log('Starting KoboMarket API...');

    // 1. Connect to MongoDB Atlas
    console.log('Connecting to MongoDB...');

    await connectMongoDB();

    console.log('MongoDB connected successfully.');

    // 2. Connect to PostgreSQL
    console.log('Connecting to PostgreSQL...');

    await db.raw('SELECT 1');

    console.log('PostgreSQL connected successfully.');

    // 3. Start Express server
    server = app.listen(env.port, () => {
      console.log('');
      console.log('====================================');
      console.log('       KOBOMARKET API STARTED');
      console.log('====================================');
      console.log(`Environment: ${env.nodeEnv}`);
      console.log(`Port: ${env.port}`);
      console.log(`API URL: http://localhost:${env.port}`);
      console.log(`Health: http://localhost:${env.port}/api/health`);
      console.log(`Swagger: http://localhost:${env.port}/api-docs`);
      console.log('====================================');
      console.log('');
    });

    // 4. Handle server errors
    server.on('error', (error) => {
      console.error('HTTP server error:', error.message);
      process.exitCode = 1;
      shutdown('SERVER_ERROR');
    });

  } catch (error) {
    console.error('');
    console.error('KoboMarket startup failed!');
    console.error(error.message);

    await cleanup();

    process.exitCode = 1;
  }
};

// 5. Close database connections safely
const cleanup = async () => {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log('MongoDB disconnected.');
    }
  } catch (error) {
    console.error('MongoDB shutdown error:', error.message);
  }

  try {
    await db.destroy();
    console.log('PostgreSQL connection pool closed.');
  } catch (error) {
    console.error('PostgreSQL shutdown error:', error.message);
  }
};

// 6. Graceful shutdown
let isShuttingDown = false;

const shutdown = async (signal) => {
  if (isShuttingDown) return;

  isShuttingDown = true;

  console.log(`\n${signal} received. Shutting down KoboMarket...`);

  if (server) {
    server.close(async () => {
      await cleanup();
      console.log('KoboMarket stopped safely.');
      process.exit(0);
    });

    // Prevent shutdown from hanging indefinitely
    setTimeout(() => {
      console.error('Shutdown timed out.');
      process.exit(1);
    }, 10000).unref();
  } else {
    await cleanup();
    process.exit(process.exitCode || 0);
  }
};

// 7. Listen for operating system shutdown signals
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

// 8. Handle unexpected errors
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled promise rejection:', reason);
  shutdown('UNHANDLED_REJECTION');
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  shutdown('UNCAUGHT_EXCEPTION');
});

// 9. Start the application
startServer();
