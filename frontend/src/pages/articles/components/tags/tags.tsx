import { type TagType } from '~/pages/articles/libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  tags: TagType[];
};

const Tags: React.FC<Properties> = ({ tags }) => (
  <ul className={styles.tags}>
    {tags.map((tag) => (
      <li className={styles.tag} key={tag.id}>
        {tag.name}
      </li>
    ))}
  </ul>
);

export { Tags };
