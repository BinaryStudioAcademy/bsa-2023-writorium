const getOriginFromRefererHeader = (
  referer: string | undefined,
): string | null => {
  if (referer) {
    const url = new URL(referer);
    return url.host;
  }

  return null;
};

export { getOriginFromRefererHeader };
