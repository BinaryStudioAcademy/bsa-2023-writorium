import { type FC } from 'react';

import { PROGRESS_MIN } from '~/pages/profile/libs/constants/constants.js';

type Properties = {
  description: string;
  progress?: number;
};

const AchievementTooltipContent: FC<Properties> = ({
  description,
  progress = PROGRESS_MIN,
}) => (
  <>
    <p>{description}</p>
    <p>Progress: {progress}%</p>
  </>
);

export { AchievementTooltipContent };
