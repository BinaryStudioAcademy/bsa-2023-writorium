import { type FC } from 'react';

import { BlockWithTooltip } from '~/libs/components/components.js';
import { DataTooltipId } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  Achievement,
  AchievementTooltipContent,
} from '~/pages/profile/components/components.js';
import { type UserAchievement } from '~/pages/profile/libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  achievements: UserAchievement[];
  hasToShowTooltip?: boolean;
  className?: string;
  classNameAchievement?: string;
};

const AchievementList: FC<Properties> = ({
  achievements,
  className,
  classNameAchievement,
  hasToShowTooltip = false,
}) => {
  return (
    <ul className={getValidClassNames(className, styles.achievementList)}>
      {achievements.map((achievement) => (
        <li key={achievement.id}>
          <BlockWithTooltip
            tooltipContent={
              <AchievementTooltipContent
                description={achievement.description}
                progress={achievement.progress}
              />
            }
            tooltipId={DataTooltipId.ACHIEVEMENT_TOOLTIP}
            hasToShowTooltip={hasToShowTooltip}
          >
            <Achievement
              achievement={achievement}
              className={classNameAchievement}
            />
          </BlockWithTooltip>
        </li>
      ))}
    </ul>
  );
};

export { AchievementList };