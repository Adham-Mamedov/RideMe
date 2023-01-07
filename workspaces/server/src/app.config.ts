import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => {
  const {
    NODE_ENV,
    APP_PORT,
    APP_HOST,
    APP_SECRET,
    BCRYPT_ROUNDS,
    JWT_SECRET,
    JWT_REFRESH_SECRET,
  } = process.env;
  const appPort = parseInt(APP_PORT, 10) || 3001;

  return {
    isDev: NODE_ENV !== 'production',
    appPort,
    appHost: APP_HOST,
    appSecret: APP_SECRET,
    bcryptRounds: parseInt(BCRYPT_ROUNDS, 10) || 10,
    jwtSecret: JWT_SECRET,
    jwtRefreshSecret: JWT_REFRESH_SECRET,
  };
});
