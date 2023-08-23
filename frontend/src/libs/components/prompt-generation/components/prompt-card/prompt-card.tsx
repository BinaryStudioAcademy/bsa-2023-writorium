import styles from './styles.module.scss';

const PromptCard: React.FC = () => {
  
  return (
    <div className={styles.container}>
      <div className={styles.category}>
          <span className={styles.categoryText}>Character</span>
        </div>
      <div className={styles.prompt}>
        <p className={styles.promptText}>Girl</p>
      </div>
    </div>
  );
};

export { PromptCard };