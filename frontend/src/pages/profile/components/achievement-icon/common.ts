import { ReactComponent as ArticlesAchievementIcon } from '~/assets/img/articles-achievement.svg';
import { ReactComponent as CommentsAchievementIcon } from '~/assets/img/comments-achievement.svg';

type AchievementIconName = 'comments' | 'articles';

const iconNameToAchievementIcon: Record<
  AchievementIconName,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  'comments': CommentsAchievementIcon,
  'articles': ArticlesAchievementIcon,
};

export { type AchievementIconName, iconNameToAchievementIcon };
