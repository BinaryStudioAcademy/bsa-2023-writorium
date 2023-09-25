type Properties = {
  description: string;
  progress: number;
};

const AchievementTooltipContent: React.FC<Properties> = ({
  description,
  progress,
}) => (
  <>
    <p>{description}</p>
    <p>Progress: {progress}%</p>
  </>
);

export { AchievementTooltipContent };
