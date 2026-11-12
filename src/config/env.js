
require('dotenv').config();

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,

  mongoUri: process.env.MONGODB_URI,
  databaseUrl: process.env.DATABASE_URL,

  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,

  accessTokenExpiresIn:
    process.env.ACCESS_TOKEN_EXPIRES_IN || '15m',

  refreshTokenExpiresIn:
    process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',

  paystackSecretKey: process.env.PAYSTACK_SECRET_KEY,

  commissionPercent:
    Number(process.env.PLATFORM_COMMISSION_PERCENT) || 5,

  escrowAutoReleaseHours:
    Number(process.env.ESCROW_AUTO_RELEASE_HOURS) || 72,

  minimumPayoutKobo:
    Number(process.env.MINIMUM_PAYOUT_KOBO) || 100000
};

module.exports = env;
