import { Icon } from '~/libs/components/components.js';

import styles from './styles.module.scss';

type Properties = {
  comments: string;
  views: string;
  likes: string;
  dislikes: string;
};

const Reactions: React.FC<Properties> = ({
  comments,
  views,
  likes,
  dislikes,
}) => (
  <ul className={styles.reactions}>
    <li className={styles.reaction}>
      <Icon iconName="comment" className={styles.reactionIcon} />
      <span className={styles.reactionCount}>{comments}</span>
    </li>
    <li className={styles.reaction}>
      <Icon iconName="view" className={styles.reactionIcon} />
      <span className={styles.reactionCount}>{views}</span>
    </li>
    <li className={styles.reaction}>
      <Icon iconName="like" className={styles.reactionIcon} />
      <span className={styles.reactionCount}>{likes}</span>
    </li>
    <li className={styles.reaction}>
      <Icon iconName="dislike" className={styles.reactionIcon} />
      <span className={styles.reactionCount}>{dislikes}</span>
    </li>
  </ul>
);

export { Reactions };
