import { ReactComponent as ArticlesAchievementIcon } from '~/assets/img/articles-achievement.svg';
import { ReactComponent as CommentsAchievementIcon } from '~/assets/img/comments-achievement.svg';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { type AchievementWithProgressResponseDto } from '~/packages/achievements/achievements.js';

import styles from './styles.module.scss';

type Properties = {
  achievement: AchievementWithProgressResponseDto;
  className?: string;
};

const Achievement: React.FC<Properties> = ({ achievement }) => {
  const { name, referenceTable, progress } = achievement;
  const radius = 45;
  const circumference = Math.PI * 2 * radius;
  const offset = (progress / 100) * circumference;

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
          <circle cx="50" cy="50" r={radius} className={styles.progressTrack} />
          <circle
            cx="50"
            cy="50"
            r={radius}
            className={styles.progress}
            strokeDasharray={`${offset} ${circumference}`}
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
