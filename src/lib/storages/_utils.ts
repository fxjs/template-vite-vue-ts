export const map = (object: object, callback: (x: string) => void): void => {
  try {
    Object.keys(object).forEach(callback);
  } catch (error) {
    console.log(error);
  }
};

export const isNil = <T>(item: T) => item === null || item === undefined;

export const isPrimitive = (a: any) => {
  const type = typeof a;
  return type === 'string' || type === 'number' || type === 'boolean' || isNil(a);
};
