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
  shouldShowTooltip?: boolean;
  className?: string;
  classNameAchievement?: string;
};

const AchievementList: FC<Properties> = ({
  achievements,
  className,
  classNameAchievement,
  shouldShowTooltip = false,
}) => {
  return (
    <ul className={getValidClassNames(className, styles.achievementList)}>
      {achievements.map((achievement) => (
        <li key={achievement.id}>
          {shouldShowTooltip ? (
            <BlockWithTooltip
              tooltipContent={
                <AchievementTooltipContent
                  description={achievement.description}
                  progress={achievement.progress}
                />
              }
              tooltipId={DataTooltipId.ACHIEVEMENT_TOOLTIP}
            >
              <Achievement
                achievement={achievement}
                className={classNameAchievement}
              />
            </BlockWithTooltip>
          ) : (
            <Achievement
              achievement={achievement}
              className={classNameAchievement}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export { AchievementList };
