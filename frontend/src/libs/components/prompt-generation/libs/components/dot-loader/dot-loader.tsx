import styles from './styles.module.scss';

type Properties = {
  children: React.ReactNode;
  isLoading: boolean;
};

const DotLoader: React.FC<Properties> = ({ isLoading, children }) => {
  if (!isLoading) {
    return children;
  }

  return (
    <div className={styles.container}>
      <div className={styles.dotFlashing}></div>
    </div>
  );
};

export { DotLoader };
