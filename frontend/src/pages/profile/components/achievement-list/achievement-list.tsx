import { type FC } from 'react';

import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { Achievement } from '~/pages/profile/components/components.js';
import { type UserAchievement } from '~/pages/profile/libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  achievements: UserAchievement[];
  showTooltip?: boolean;
  className?: string;
  classNameAchievement?: string;
};

const AchievementList: FC<Properties> = ({
  achievements,
  showTooltip = false,
  className,
  classNameAchievement,
}) => {
  return (
    <ul className={getValidClassNames(className, styles.achievementList)}>
      {achievements.map((achievement) => (
        <li key={achievement.id}>
          <Achievement
            achievement={achievement}
            showTooltip={showTooltip}
            className={classNameAchievement}
          />
        </li>
      ))}
    </ul>
  );
};

export { AchievementList };
