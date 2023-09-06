import { type ValueOf } from '~/libs/types/types.js';
import { type PromptCategory } from '~/packages/prompts/libs/enums/enums.js';

import { DotLoader } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  category: ValueOf<typeof PromptCategory>;
  text: string;
  isGenerating: boolean;
};

const PromptCard: React.FC<Properties> = ({ category, text, isGenerating }) => (
  <li className={styles.container}>
    <div className={styles.category}>
      <span className={styles.categoryText}>{category}</span>
    </div>
    <div className={styles.prompt}>
      {isGenerating ? (
        <DotLoader />
      ) : (
        <p className={styles.promptText}>{text}</p>
      )}
    </div>
  </li>
);

export { PromptCard };
