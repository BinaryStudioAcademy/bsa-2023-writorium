import { Icon } from '~/libs/components/components.js';

import { type Reaction as ReactionType } from '../article-card/libs/types/types.js';
import styles from './styles.module.scss';

type Properties = {
  iconName: ReactionType;
  reactions: string;
};

const Reaction: React.FC<Properties> = ({ iconName, reactions }) => (
  <div className={styles.reaction} key={iconName}>
    <Icon iconName={iconName} className={styles.reactionIcon} />
    <span className={styles.reactionCount}>{reactions}</span>
  </div>
);

export { Reaction };
