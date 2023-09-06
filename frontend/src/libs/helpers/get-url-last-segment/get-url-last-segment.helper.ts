const getUrlLastSegment = (url: string): string => {
  const segments = url.split('/');

  return segments.at(-1) as string;
};

export { getUrlLastSegment };
