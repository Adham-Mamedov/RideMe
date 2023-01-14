export { JwtRefreshStrategy } from './jwtRefresh.strategy';
export { JwtStrategy } from './jwt.strategy';

export const enum ExpirationTime {
  accessToken = 360, // 6min
  refreshToken = 43_200, // 12h
}

export const RefreshTokenCookieName = 'JWT_REFRESH';
export const AccessTokenCookieName = 'JWT';

export const cookieExtractor = (name: string) => {
  return (req) => {
    return req?.cookies ? req.cookies[name] : null;
  };
};
