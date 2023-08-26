import { Button, Icon } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useEffect, useState } from '~/libs/hooks/hooks.js';

import { PromptCard } from './libs/components/components.js';
import { PromptCategory } from './libs/enums/enums.js';
import { categoryPrompts } from './libs/mocks/mocks.js';
import styles from './styles.module.scss';

const { CHARACTER, SITUATION, SETTING, PROP, GENRE } = PromptCategory;

const defaultPrompt = {
  [CHARACTER]: 'Girl',
  [SITUATION]: 'Street',
  [SETTING]: '',
  [PROP]: 'Red hair',
  [GENRE]: 'Fiction',
};

const PromptGeneration: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState(defaultPrompt);

  const promptCategories = Object.values(PromptCategory);

  useEffect(() => {
    if (isSpinning) {
      const timerId = setTimeout(() => {
        setGeneratedPrompt((previousGeneratedPrompt) => {
          const updatedGeneratedPrompt = { ...previousGeneratedPrompt };
          for (const category of promptCategories) {
            const prompts = categoryPrompts[category];
            const randomIndex = Math.floor(Math.random() * prompts.length);
            updatedGeneratedPrompt[category] = prompts[randomIndex];
          }
          return updatedGeneratedPrompt;
        });
        setIsSpinning(false);
      }, 3000);

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [isSpinning, promptCategories]);

  const handleButtonClick = useCallback(() => {
    setIsSpinning(true);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Write your own story</h1>
      <div className={styles.promptsContainer}>
        {promptCategories.map((category) => (
          <PromptCard
            key={category}
            category={category}
            text={generatedPrompt[category]}
          />
        ))}
        <Button
          className={styles.shuffleButton}
          label={
            <Icon
              iconName="refresh"
              className={getValidClassNames(isSpinning && styles.spin)}
            />
          }
          onClick={handleButtonClick}
        />
      </div>
    </div>
  );
};

export { PromptGeneration };
