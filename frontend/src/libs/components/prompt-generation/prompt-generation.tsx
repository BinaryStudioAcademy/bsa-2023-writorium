import { Button, Icon } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useState } from '~/libs/hooks/hooks.js';

import { PromptCard } from './libs/components/components.js';
import { PromptCategory } from './libs/enums/enums.js';
import styles from './styles.module.scss';

const PromptGeneration: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);

  const promptCategories = Object.values(PromptCategory);

  const handleButtonClick = useCallback((): void => {
    setIsSpinning(true);

    setTimeout(() => {
      setIsSpinning(false);
    }, 3000);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Write your own story</h1>
      <div className={styles.promptsContainer}>
        {promptCategories.map((category) => (
          <PromptCard
            key={category}
            category={category}
            isSpinning={isSpinning}
          />
        ))}
        <Button
          className={styles.shuffleButton}
          label={
            <Icon
              iconName={'refresh'}
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
