type WithNullableKeys<T, K extends keyof T> = Omit<T, K> & {
  [P in K]: T[P] | null;
};

export { type WithNullableKeys };
