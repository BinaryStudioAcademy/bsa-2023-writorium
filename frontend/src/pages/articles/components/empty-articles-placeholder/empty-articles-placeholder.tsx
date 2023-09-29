import { Icon } from '~/libs/components/components.js';

import { PlaceholderMessage } from './libs/enums/enums.js';
import styles from './styles.module.scss';

type Properties = {
  shouldShowFilterMessage?: boolean;
};

const EmptyArticlesPlaceholder: React.FC<Properties> = ({
  shouldShowFilterMessage,
}) => (
  <section className={styles.emptyArticlesPlaceholder}>
    <Icon iconName="book" className={styles.emptyArticlesIcon} />
    <h2>
      {shouldShowFilterMessage
        ? PlaceholderMessage.FILTER_SELECTED
        : PlaceholderMessage.DEFAULT}
    </h2>
  </section>
);

export { EmptyArticlesPlaceholder };
