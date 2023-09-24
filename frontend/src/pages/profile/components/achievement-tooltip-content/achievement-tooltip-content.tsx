import { PROGRESS_MIN } from '../../libs/constants/constants.js';

type Properties = {
  description: string;
  progress?: number;
};

const AchievementTooltipContent: React.FC<Properties> = ({
  description,
  progress = PROGRESS_MIN,
}) => (
  <>
    <p>{description}</p>
    <p>Progress: {progress}%</p>
  </>
);

export { AchievementTooltipContent };
