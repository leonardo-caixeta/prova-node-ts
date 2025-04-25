export type ServiceStatus =
  | 'SUCCESSFUL'
  | 'CREATED'
  | 'REQUIRED_DATA'
  | 'INVALID_DATA'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'INVALID_TOKEN';

export type ServiceMessage = { message: string };

export type ServiceResponseError = {
  status: ServiceStatus;
  message: string;
};

export type ServiceResponseSuccess<T = any> = {
  status: 'SUCCESSFUL' | 'CREATED';
  message: T;
};

export type ServiceResponse<T> =
  | ServiceResponseError
  | ServiceResponseSuccess<T>;
