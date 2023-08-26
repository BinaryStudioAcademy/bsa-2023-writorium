import { type FC } from 'react';

import { Avatar, Icon } from '~/libs/components/components.js';

import styles from './styles.module.scss';

type Properties = {
  name?: string;
  followers?: number;
  rating?: number;
  publishedAt?: string;
  readingTime?: string;
  genre?: string;
};

const Author: FC<Properties> = ({
  name = 'Charlie Culhane',
  followers = 10,
  rating = 700,
  publishedAt = '2023-04-22',
  readingTime = '7 min',
  genre = 'Fiction',
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.authorWrpr}>
        <div className={styles.avatarWrpr}>
          <Avatar username={name} avatarUrl={null} />
        </div>
        <div>
          <h2 className={styles.authorName}>{name}</h2>
          <ul className={styles.authorInfoWrpr}>
            <li className={styles.authorInfo}>
              <Icon iconName="renew" />
              <span className={styles.authorInfoValue}>{followers}</span>
              following
            </li>
            <li className={styles.authorInfo}>
              <Icon iconName="star" />
              <span className={styles.authorInfoValue}>{rating}</span>
              rating
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.articleInfoWrpr}>
        <div className={styles.articleInfoListWrpr}>
          <Icon iconName="notes" />
          <ul className={styles.articleInfoList}>
            <li className={styles.articleInfoItem}>
              <span>{publishedAt}</span>
            </li>
            <li className={styles.articleInfoItem}>
              <span className={styles.articleTimeValue}>{readingTime}</span>
              read
            </li>
          </ul>
        </div>

        <Icon iconName="sparkles" />
        <span className={styles.articleGenre}>{genre}</span>
      </div>
    </div>
  );
};

export { Author };
