const mbToBytes = (mb: number): number => {
  const bytesInMB = 1024 * 1024;
  return mb * bytesInMB;
};

export { mbToBytes };
