import { type PromptCategoryValue } from '../../enums/enums.js';
import styles from './styles.module.scss';

type Properties = {
  category: PromptCategoryValue;
  text: string;
};

const PromptCard: React.FC<Properties> = ({ category, text }) => (
  <div className={styles.container}>
    <div className={styles.category}>
      <span className={styles.categoryText}>{category}</span>
    </div>
    <div className={styles.prompt}>
      <p className={styles.promptText}>{text}</p>
    </div>
  </div>
);

export { PromptCard };
