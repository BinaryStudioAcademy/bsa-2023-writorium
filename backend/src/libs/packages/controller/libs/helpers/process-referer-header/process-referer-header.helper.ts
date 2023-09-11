const processRefererHeader = (
  referer: string | undefined,
): string | undefined => {
  const match = referer && referer.match(/:\/\/(.[^/]+)/);
  if (match && match[1]) {
    return match[1];
  }
};

export { processRefererHeader };
