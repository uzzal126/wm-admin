const unsafeExecutable = (argument?: any): any => { return argument; };

export type UnsafeExecutable = typeof unsafeExecutable;

export const executeUnsafe = (unsafeExecutable: UnsafeExecutable, argument?: any): any => {
  // if the unsafe executable is not a function...
  if (typeof unsafeExecutable !== 'function') {
    console.warn('Unsafe executable must be a function/method.');

    // we shall return 'undefined'...
    return undefined;
  }

  try {
    return unsafeExecutable(argument);
  } catch (error) {
    console.error('An error occurred while executing the unsafe executable.', error);
  }

  return undefined;
};

export const isUndefinedOrNull = (value: any): boolean => {
  return typeof value === 'undefined' || value === null;
};

export const isObject = (value: any): boolean => {
  if (isUndefinedOrNull(value)) { return false; }

  return typeof value === 'object';
};

export const isUndefinedNullOrEmptyString = (value: any): boolean => {
  return typeof value !== 'string' || !value.length;
};
