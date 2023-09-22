import { Icon } from '~/libs/components/components.js';

import styles from './styles.module.scss';

const EmptyArticlesPlaceholder: React.FC = () => {
  return (
    <h2 className={styles.emptyArticlesPlaceholder}>
      <Icon iconName="book" className={styles.emptyArticlesIcon} />
      It seems like there are no articles yet
    </h2>
  );
};

export { EmptyArticlesPlaceholder };
