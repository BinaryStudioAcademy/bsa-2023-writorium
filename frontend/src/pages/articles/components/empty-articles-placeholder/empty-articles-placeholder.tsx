import { Icon } from '~/libs/components/components.js';

import styles from './styles.module.scss';

const EmptyArticlesPlaceholder: React.FC = () => {
  return (
    <h2 className={styles.emptyArticlesPlaceholder}>
      It seems like there are no articles yet
      <Icon iconName="book" className={styles.emptyArticlesIcon} />
    </h2>
  );
};

export { EmptyArticlesPlaceholder };
