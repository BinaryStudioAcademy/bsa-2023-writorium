import {
  type AchievementIconName,
  iconNameToAchievementIcon,
} from './common.js';

type Properties = {
  iconName: AchievementIconName;
};

const AchievementIcon: React.FC<Properties> = ({ iconName }) => {
  const Icon = iconNameToAchievementIcon[iconName];

  return <Icon />;
};

export { AchievementIcon };
