import { IBilletCreate, IBilletUpdate } from '../interfaces/IBillet';
import { IUserCreate, IUserLogin, IUserUpdate } from '../interfaces/IUser';
import { ValidationResult } from '../types';
import {
  loginValidation,
  updateUserValidation,
  createUserValidation,
  createRoleValidation,
  createBilletValidation,
  updateBilletValidation
} from './schemas/schema';

export const validateLogin = ({
  email,
  password
}: IUserLogin): ValidationResult => {
  const validation = loginValidation.validate({ email, password });

  const typeError = validation.error?.details[0].type;
  const message =
    validation.error?.details[0].message || validation.error?.message;

  if (!validation.error) return null;

  if (typeError === 'any.required' || typeError === 'string.empty') {
    return { status: 'REQUIRED_DATA', message };
  }
  return { status: 'INVALID_DATA', message };
};

export const validateUserCreate = (data: IUserCreate): ValidationResult => {
  const validation = createUserValidation.validate(data);
  const typeError = validation.error?.details[0].type;
  const message =
    validation.error?.details[0].message || validation.error?.message;

  if (!validation.error) return null;

  if (typeError === 'any.required' || typeError === 'string.empty') {
    return { status: 'REQUIRED_DATA', message };
  }
  return { status: 'INVALID_DATA', message };
};

export const validateUserUpdate = (
  data: IUserUpdate,
  id: number
): ValidationResult => {
  const validation = updateUserValidation.validate({ ...data, id });

  const typeError = validation.error?.details[0].type;
  const message =
    validation.error?.details[0].message || validation.error?.message;

  if (!validation.error) return null;

  if (typeError === 'any.required' || typeError === 'string.empty') {
    return { status: 'REQUIRED_DATA', message };
  }
  return { status: 'INVALID_DATA', message };
};

export const validateRole = (data: { name: string }): ValidationResult => {
  const validation = createRoleValidation.validate(data);
  const typeError = validation.error?.details[0].type;
  const message =
    validation.error?.details[0].message || validation.error?.message;

  if (!validation.error) return null;

  if (typeError === 'any.required' || typeError === 'string.empty') {
    return { status: 'REQUIRED_DATA', message };
  }
  return { status: 'INVALID_DATA', message };
};

export const validateCreateBillet = (data: IBilletCreate): ValidationResult => {
  const validation = createBilletValidation.validate(data);
  const typeError = validation.error?.details[0].type;
  const message =
    validation.error?.details[0].message || validation.error?.message;

  if (!validation.error) return null;

  if (typeError === 'any.required' || typeError === 'string.empty') {
    return { status: 'REQUIRED_DATA', message };
  }
  return { status: 'INVALID_DATA', message };
};

export const validateUpdateBillet = (data: IBilletUpdate): ValidationResult => {
  const validation = updateBilletValidation.validate(data);

  const typeError = validation.error?.details[0].type;
  const message =
    validation.error?.details[0].message || validation.error?.message;

  if (!validation.error) return null;

  if (typeError === 'any.required' || typeError === 'string.empty') {
    return { status: 'REQUIRED_DATA', message };
  }
  return { status: 'INVALID_DATA', message };
};
