const DEEP = 0.05;
const HALF_DIVIDER = 2;

type Properties = {
  axisValue: number;
  innerAxisValue: number;
  deep?: number;
};

const getAxisOffset = ({
  axisValue,
  innerAxisValue,
  deep = DEEP,
}: Properties): number => {
  return (axisValue - innerAxisValue / HALF_DIVIDER) * deep;
};

export { getAxisOffset };
