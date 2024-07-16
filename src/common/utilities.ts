import { UidGenerator } from './uid-generator'

const HTML_TAG_REGULAR_EXPRESSION = /\<([^\>]+)\>/g
const TEXT_ENCODER = new TextEncoder();
const TEXT_DECODER = new TextDecoder();

const unsafeExecutable = (argument?: any): any => {
  return argument
}

export type UnsafeExecutable = typeof unsafeExecutable

export const executeUnsafe = (unsafeExecutable: UnsafeExecutable, argument?: any): any => {
  // if the unsafe executable is not a function...
  if (typeof unsafeExecutable !== 'function') {
    console.warn('Unsafe executable must be a function/method.')

    // we shall return 'undefined'...
    return undefined
  }

  try {
    return unsafeExecutable(argument)
  } catch (error) {
    console.error('An error occurred while executing the unsafe executable.', error)
  }

  return undefined
}

export const isUndefinedOrNull = (value: any): boolean => {
  return typeof value === 'undefined' || value === null
}

export const isObject = (value: any): boolean => {
  if (isUndefinedOrNull(value)) {
    return false
  }

  return typeof value === 'object' && !isArray(value);
}

export const cloneObject = <Type>(value: Type): Type => {
  if (!isObject(value)) { return Object.create(null); }

  const json = JSON.stringify(value);
  const clonedObject = JSON.parse(json);

  return clonedObject;
};

export const isNumber = (value: any): boolean => {
  const valueAsNumber = getDefaultIfNotNumber(value, undefined);

  return typeof valueAsNumber !== 'undefined';
};

export const getDefaultIfNotNumber = (value: any, defaultValue: any = undefined): any => {
  const valueAsNumber = Number(value);

  if (isNaN(value)) { return defaultValue; }

  return valueAsNumber;
};

export const isUndefinedNullOrEmptyString = (value: any): boolean => {
  return typeof value !== 'string' || !value.length
}

export const isUndefinedNullOrWhiteSpaceString = (value: any): boolean => {
  if (typeof value !== 'string') {
    return true
  }

  value = value.trim()

  return !value.length
}

export const generateUniqueId = (): string => {
  return UidGenerator.getInstance().generate()
}

export const extractTextFromHtml = (htmlContent: string): string => {
  if (typeof htmlContent !== 'string') {
    return ''
  }

  htmlContent = htmlContent.replaceAll(HTML_TAG_REGULAR_EXPRESSION, '').trim()

  return htmlContent.length ? htmlContent : ''
}

export const isArray = (value: any): boolean => {
  return Array.isArray(value);
}

export const addToArray = (value: any, array: Array<any>): Array<any> => {
  if (isUndefinedOrNull(value)) { return [...array,]; }

  array.push(value);

  return [...array,];
};

export const removeFromArrayByIndex = (index: number, array: Array<any>): Array<any> => {
  if (!isArray(array) || !array.length) { return []; }
  if (index < 0 || index > array.length) { return [...array,]; }

  const newArray: Array<any> = [];

  for (let i = 0; i < array.length; ++i) {
    if (i === index) { continue; }

    newArray.push(array[i]);
  }

  return newArray;
}

export const findFromArrayOfObjectsByValue = (key: string, value: any, array: Array<any>): any => {
  if (!isArray(array) || !array.length) { return undefined; }

  for (let i = 0; i < array.length; ++i) {
    const element = array[i];

    if (isObject(element) && element[key] === value) { return element; }
  }

  return undefined;
}

export const removeFromArrayOfObjectsByValue = (key: string, value: any, array: Array<any>): Array<any> => {
  if (!isArray(array) || !array.length) { return []; }

  const newArray: Array<any> = [];

  for (let i = 0; i < array.length; ++i) {
    const element = array[i];

    if (isObject(element) && element[key] === value) { continue; }

    newArray.push(element);
  }

  return newArray;
}

export const sleepAsync = (sleepTimeoutInMilliseconds: number): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), sleepTimeoutInMilliseconds);
  });
};

export const convertStringToByteArray = (text: string): Uint8Array => {
  return TEXT_ENCODER.encode(text);
};

export const convertByteArrayToString = (byteArray: Uint8Array): string => {
  return TEXT_DECODER.decode(byteArray);
};

export const computeByteLength = (text: string): number => {
  const byteArray = convertStringToByteArray(text);

  return byteArray.byteLength;
};

export const truncateByByteLength = (text: string, byteLength: number): string => {
  const byteArray = convertStringToByteArray(text);
  const slicedByteArray = byteArray.slice(0, byteLength);
  let truncatedString = convertByteArrayToString(slicedByteArray);
  truncatedString = truncatedString.substring(0, truncatedString.length - 1);

  return truncatedString;
};
