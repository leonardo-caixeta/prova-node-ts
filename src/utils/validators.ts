import {
  loginValidation,
  updateValidation,
  createValidation,
  createRoleValidation
} from './schemas/schema';

type ValidationResult = { status: string; message: string | undefined } | null;

export const validateLogin = ({
  email,
  password
}: {
  email: string;
  password: string;
}): ValidationResult => {
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

export const validateCreate = (data: {
  name: string;
  email: string;
  password: string;
  cargo: string;
}): ValidationResult => {
  const validation = createValidation.validate(data);
  const typeError = validation.error?.details[0].type;
  const message =
    validation.error?.details[0].message || validation.error?.message;

  if (!validation.error) return null;

  if (typeError === 'any.required' || typeError === 'string.empty') {
    return { status: 'REQUIRED_DATA', message };
  }
  return { status: 'INVALID_DATA', message };
};

export const validateUpdate = (
  data: {
    name: string;
    email: string;
    password?: string;
  },
  id: number
): ValidationResult => {
  const validation = updateValidation.validate({ ...data, id });

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
