import { Button, Icon } from '~/libs/components/components.js';

import { PromptCard } from './components/components.js';
import styles from './styles.module.scss';

const PromptGeneration: React.FC = () => {

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Write your own story</h1>
      <div className={styles.promptsContainer}>
        <PromptCard />
        <PromptCard />
        <PromptCard />
        <PromptCard />
        <PromptCard />
        <Button 
          className={styles.shuffleButton} 
          label={<Icon iconName={'refresh'} />} 
        />
      </div>
    </div>
  );
};

export { PromptGeneration };