import { Button, Icon } from '~/libs/components/components.js';

import { PromptCard } from './libs/components/components.js';
import { PromptCategory } from './libs/enums/enums.js';
import styles from './styles.module.scss';

const PromptGeneration: React.FC = () => {
  const promptCategories = Object.values(PromptCategory);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Write your own story</h1>
      <div className={styles.promptsContainer}>
        {promptCategories.map((category) => (
          <PromptCard key={category} category={category}/>
        ))}
        <Button 
          className={styles.shuffleButton} 
          label={<Icon iconName={'refresh'} />} 
        />
      </div>
    </div>
  );
};

export { PromptGeneration };