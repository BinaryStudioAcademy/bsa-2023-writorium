import styles from './styles.module.scss';

type Properties = {
  category: string;
};

const PromptCard: React.FC<Properties> = ({ category }) => {
  
  return (
    <div className={styles.container}>
      <div className={styles.category}>
          <span className={styles.categoryText}>{category}</span>
        </div>
      <div className={styles.prompt}>
        <p className={styles.promptText}>Girl</p>
      </div>
    </div>
  );
};

export { PromptCard };