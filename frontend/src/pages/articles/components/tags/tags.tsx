import { type TagType } from '../../libs/types/types.js';
import styles from './styles.module.scss';

type Properties = {
  tags: TagType[];
};

const Tags: React.FC<Properties> = ({ tags }) => (
  <ul className={styles.tags}>
    {tags.map((tag) => (
      <li key={tag.id} className={styles.container}>
        <div className={styles.category}>
          <span className={styles.categoryText}>{tag.category}</span>
        </div>
        <div className={styles.prompt}>
          <p className={styles.promptText}>{tag.text}</p>
        </div>
      </li>
    ))}
  </ul>
);

export { Tags };
