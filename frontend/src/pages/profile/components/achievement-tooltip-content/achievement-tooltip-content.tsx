import { type FC } from 'react';

type Properties = {
  description: string;
  progress: number;
};

const AchievementTooltipContent: FC<Properties> = ({
  description,
  progress,
}) => (
  <>
    <p>{description}</p>
    <p>Progress: {progress}%</p>
  </>
);

export { AchievementTooltipContent };
