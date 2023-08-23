import { PromptCard } from './components/components.js';
import styles from './styles.module.scss';

const PromptGeneration: React.FC = () => {

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Write your own story</h1>
      <PromptCard />
    </div>
  );
};

export { PromptGeneration };