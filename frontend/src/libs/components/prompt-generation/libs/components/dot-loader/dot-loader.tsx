import styles from './styles.module.scss';

const DotLoader: React.FC = () => (
  <div className={styles.container}>
    <div className={styles.dotFlashing}></div>
  </div>
);

export { DotLoader };
