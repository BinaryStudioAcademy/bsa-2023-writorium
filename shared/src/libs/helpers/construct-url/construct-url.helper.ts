type ConstructUrlParameters<
  T extends Record<string, unknown> | undefined = undefined,
> = {
  path: string;
  queryParams?: T;
};

const constructUrl = <T extends Record<string, unknown>>({
  path,
  queryParams: queryParameters = {} as T,
}: ConstructUrlParameters<T>): string => {
  const url = new URL(path || '/', `https://${window.location.host}`);

  for (const [key, value] of Object.entries(queryParameters)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        url.searchParams.append(`${key}[]`, String(item));
      }
    } else if (value !== null) {
      url.searchParams.append(key, String(value));
    }
  }

  return url.pathname + url.search;
};

export { constructUrl };
