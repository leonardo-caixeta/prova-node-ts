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
  data: ServiceMessage;
};

export type ServiceResponseSuccess<T> = {
  status: 'SUCCESSFUL' | 'CREATED';
  data: T;
};

export type ServiceResponse<T> =
  | ServiceResponseError
  | ServiceResponseSuccess<T>;
