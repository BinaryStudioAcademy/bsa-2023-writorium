import { BlockWithTooltip } from '~/libs/components/components.js';
import { DataTooltipId } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { type AchievementWithProgressResponseDto } from '~/packages/achievements/achievements.js';

import {
  Achievement,
  AchievementTooltipContent,
} from '../../components/components.js';
import styles from './styles.module.scss';

type Properties = {
  achievements: AchievementWithProgressResponseDto[];
  hasToShowTooltip?: boolean;
  className?: string;
  classNameAchievement?: string;
};

const AchievementList: React.FC<Properties> = ({
  achievements,
  className,
  classNameAchievement,
  hasToShowTooltip = false,
}) => {
  return (
    <ul className={getValidClassNames(className, styles.achievementList)}>
      {achievements.map((achievement) => (
        <li key={achievement.id} className={styles.achievementListItem}>
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
