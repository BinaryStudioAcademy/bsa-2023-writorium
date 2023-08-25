import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useEffect, useState } from '~/libs/hooks/hooks.js';

import { type PromptCategoryValue } from '../../enums/enums.js';
import { categoryPrompts } from '../../mocks/mocks.js';
import styles from './styles.module.scss';

type Properties = {
  category: PromptCategoryValue;
  isSpinning: boolean;
};

const PromptCard: React.FC<Properties> = ({ category, isSpinning }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prompts = categoryPrompts[category];

  useEffect(() => {
    if (isSpinning) {
      const randomIndex = Math.floor(Math.random() * prompts.length);
      setCurrentIndex(randomIndex);
    }
  }, [isSpinning, prompts]);

  const promptStyle = {
    transform: `translateY(-${(currentIndex * 100) / prompts.length}%)`,
  };

  return (
    <div className={styles.container}>
      <div className={styles.category}>
        <span className={styles.categoryText}>{category}</span>
      </div>
      <div className={styles.prompt}>
        <div
          className={getValidClassNames(isSpinning && styles.scroll)}
          style={promptStyle}
        >
          {prompts.map((text, index) => (
            <p key={index} className={styles.promptText}>
              {text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export { PromptCard };
