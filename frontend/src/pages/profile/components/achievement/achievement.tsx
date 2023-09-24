import { ReactComponent as ArticlesAchievementIcon } from '~/assets/img/articles-achievement.svg';
import { ReactComponent as CommentsAchievementIcon } from '~/assets/img/comments-achievement.svg';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { type AchievementWithProgressResponseDto } from '~/packages/achievements/achievements.js';

import { AchievementItemConfig } from '../../libs/enums/enums.js';
import { getRadialProgressStyleString } from '../../libs/helpers/helpers.js';
import styles from './styles.module.scss';

type Properties = {
  achievement: AchievementWithProgressResponseDto;
  className?: string;
};

const Achievement: React.FC<Properties> = ({ achievement }) => {
  const { name, referenceTable, progress } = achievement;
  const achievementEntityClassName: string | undefined = {
    'comments': styles.comments,
    'articles': styles.articles,
  }[referenceTable];

  const AchievementImage: React.FC<React.SVGProps<SVGSVGElement>> | undefined =
    {
      'comments': CommentsAchievementIcon,
      'articles': ArticlesAchievementIcon,
    }[referenceTable];

  return (
    <div className={styles.achievementWrapper}>
      <div
        className={getValidClassNames(
          styles.achievementBadge,
          achievementEntityClassName,
          !progress && styles.notStarted,
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
          {AchievementImage && <AchievementImage />}
        </div>
      </div>
      <h4 className={styles.name}>{name}</h4>
    </div>
  );
};

export { Achievement };
