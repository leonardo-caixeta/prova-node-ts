export type ServiceStatus =
  | 'SUCCESSFUL'
  | 'CREATED'
  | 'REQUIRED_DATA'
  | 'INVALID_DATA'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'INVALID_TOKEN';

export interface IServiceResponse<T = any> {
  status: ServiceStatus;
  message: T;
}
