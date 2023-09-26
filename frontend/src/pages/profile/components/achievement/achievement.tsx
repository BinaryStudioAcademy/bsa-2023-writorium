import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { type AchievementWithProgressResponseDto } from '~/packages/achievements/achievements.js';

import { AchievementItemConfig } from '../../libs/enums/enums.js';
import {
  getProgressStyleClass,
  getRadialProgressStyleString,
} from '../../libs/helpers/helpers.js';
import { AchievementIcon } from '../achievement-icon/achievement-icon.js';
import { type AchievementIconName } from '../achievement-icon/common.js';
import styles from './styles.module.scss';

type Properties = {
  achievement: AchievementWithProgressResponseDto;
  className?: string;
  classNameBadge?: string;
};

const Achievement: React.FC<Properties> = ({
  achievement,
  className,
  classNameBadge,
}) => {
  const { name, referenceTable, progress } = achievement;

  const progressStyleClassName = getProgressStyleClass(progress);

  return (
    <div className={getValidClassNames(styles.achievementWrapper, className)}>
      <div
        className={getValidClassNames(
          classNameBadge,
          styles.achievementBadge,
          styles[progressStyleClassName],
        )}
      >
        <svg viewBox="0 0 100 100" className={styles.progressWrapper}>
          <circle
            cx="50"
            cy="50"
            className={styles.progressTrack}
            r={AchievementItemConfig.PROGRESS_RADIUS}
          />
          <circle
            cx="50"
            cy="50"
            className={styles.progress}
            r={AchievementItemConfig.PROGRESS_RADIUS}
            strokeDasharray={getRadialProgressStyleString(
              progress,
              AchievementItemConfig.PROGRESS_RADIUS,
            )}
          />
        </svg>
        <div className={styles.achievementImage}>
          <AchievementIcon iconName={referenceTable as AchievementIconName} />
        </div>
      </div>
      <h4 className={styles.name}>{name}</h4>
    </div>
  );
};

export { Achievement };
