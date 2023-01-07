export enum Route {
  Api = '/api',
  Auth = '/auth',
  Webhook = '/webhook',
  Swagger = 'api/swagger',
  App = '/app',
  User = '/users',
}

export enum Role {
  User = 'User',
  Admin = 'Admin',
  Owner = 'Owner',
}

export enum ErrorCodes {
  UserAlreadyExists = 'User already exists',
  UserNotFound = 'User not found',
  InternalServerError = 'Internal server error',
  FailedToRefreshToken = 'Failed to refresh token',
  InvalidRefreshToken = 'Invalid refresh token',
}
