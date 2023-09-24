import { getValidClassNames } from '~/libs/helpers/helpers.js';

import { getProgressStyleClass } from '../../libs/helpers/helpers.js';
import { type UserAchievement } from '../../libs/types/types.js';
import styles from './styles.module.scss';

type Properties = {
  achievement: UserAchievement;
  className?: string;
};

const Achievement: React.FC<Properties> = ({ achievement, className }) => {
  const { name, progress } = achievement;
  const statusStyleClass = getProgressStyleClass(progress);

  return (
    <div
      className={getValidClassNames(
        styles.achievementItem,
        className,
        styles[statusStyleClass],
      )}
    >
      <h4>{name}</h4>
    </div>
  );
};

export { Achievement };
