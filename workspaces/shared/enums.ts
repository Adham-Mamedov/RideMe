export enum ERoute {
  Api = '/api',
  Auth = '/auth',
  Swagger = 'api/swagger',
  App = '/app',
  Users = '/users',
  Stations = '/stations',
  Bikes = '/bikes',
  Rides = '/rides',
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
  StationNotFound = 'Station not found',
  CreateStationFailed = 'Failed to create station',
  EditStationFailed = 'Failed to edit station',
  DeleteStationFailed = 'Failed to delete station',
  BikeNotFound = 'Bike not found',
  CreateBikeFailed = 'Failed to create bike',
  EditBikeFailed = 'Failed to edit bike',
  DeleteBikeFailed = 'Failed to delete bike',
  RideNotFound = 'Ride not found',
  CreateRideFailed = 'Failed to create ride',
  EditRideFailed = 'Failed to edit ride',
  DeleteRideFailed = 'Failed to delete ride',
  CommentNotFound = 'Comment not found',
  CreateCommentFailed = 'Failed to create comment',
  EditCommentFailed = 'Failed to edit comment',
  DeleteCommentFailed = 'Failed to delete comment',
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
