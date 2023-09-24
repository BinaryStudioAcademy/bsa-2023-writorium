import { Icon } from '~/libs/components/components.js';

import styles from './styles.module.scss';

const EmptyArticlesPlaceholder: React.FC = () => (
  <section className={styles.emptyArticlesPlaceholder}>
    <Icon iconName="book" className={styles.emptyArticlesIcon} />
    <h2>It seems like there are no articles yet</h2>
  </section>
);

export { EmptyArticlesPlaceholder };
