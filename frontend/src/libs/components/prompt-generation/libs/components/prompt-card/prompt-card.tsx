import { Loader } from '~/libs/components/components.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type PromptCategory } from '~/packages/prompts/libs/enums/enums.js';

import styles from './styles.module.scss';

type Properties = {
  category: ValueOf<typeof PromptCategory>;
  text: string;
  isGenerating: boolean;
};

const PromptCard: React.FC<Properties> = ({ category, text, isGenerating }) => (
  <li>
    <div className={styles.category}>
      <span className={styles.categoryText}>{category}</span>
    </div>
    <div className={styles.prompt}>
      <Loader isLoading={isGenerating} type="dots">
        <p className={styles.promptText}>{text.toLowerCase()}</p>
      </Loader>
    </div>
  </li>
);

export { PromptCard };
