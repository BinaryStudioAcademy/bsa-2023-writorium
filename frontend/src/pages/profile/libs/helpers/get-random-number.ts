const getRandomNumber = ({
  min = 0,
  max,
}: {
  min: number;
  max: number;
}): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export { getRandomNumber };
