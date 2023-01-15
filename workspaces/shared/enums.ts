export enum ERoute {
  Api = '/api',
  Auth = '/auth',
  Swagger = 'api/swagger',
  App = '/app',
  User = '/users',
}

export enum Role {
  User = 'User',
  Admin = 'Admin',
  Owner = 'Owner',
}

export enum EErrorMessages {
  UserAlreadyExists = 'User already exists',
  UserNotFound = 'User not found',
  InternalServerError = 'Internal server error',
  FailedToRefreshToken = 'Failed to refresh token',
  InvalidRefreshToken = 'Invalid refresh token',
}

export enum ECookieNames {
  RefreshTokenCookieName = 'JWT_REFRESH',
  AccessTokenCookieName = 'JWT',
  UserCookieName = 'JWT_USER',
}

export enum EReactQueryKeys {
  logout = 'logout',
  refreshToken = 'refreshToken',
  users = 'users',
}
