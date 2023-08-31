import styles from './styles.module.scss';

type Properties = {
  children: React.ReactNode;
};

const Layout: React.FC<Properties> = ({ children }) => (
  <div className={styles.layout}>{children}</div>
);

export { Layout };
