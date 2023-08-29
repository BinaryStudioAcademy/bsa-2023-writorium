import styles from './styles.module.scss';

type Properties = {
  name: string;
};

const Tag: React.FC<Properties> = ({ name }) => {
  return <span className={styles.tag}>{name}</span>;
};

export { Tag };
