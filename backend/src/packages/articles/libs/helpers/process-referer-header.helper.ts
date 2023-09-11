const processRefererHeader = (
  referer: string | undefined,
): string | undefined => {
  if (referer) {
    const url = new URL(referer);
    return url.host;
  }
};

export { processRefererHeader };
