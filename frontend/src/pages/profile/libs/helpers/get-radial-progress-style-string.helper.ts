import { PercentageProgress } from '~/packages/achievements/achievements.js';

const getRadialProgressStyleString = (
  progress: number,
  radius: number,
): string => {
  const diameter = 2 * radius;
  const circumference = Math.PI * diameter;
  const offset = (progress / PercentageProgress.MAX) * circumference;
  return `${offset} ${circumference}`;
};

export { getRadialProgressStyleString };
