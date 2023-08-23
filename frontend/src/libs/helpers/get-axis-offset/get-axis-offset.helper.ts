const DEEP = 0.05;

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
  return (axisValue - innerAxisValue / 2) * deep;
};

export { getAxisOffset };
