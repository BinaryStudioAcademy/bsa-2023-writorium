import { type FC } from 'react';

import { Avatar, Icon } from '~/libs/components/components.js';
import { DateFormat } from '~/libs/enums/enums.js';
import { getFormattedDate } from '~/libs/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
  name?: string;
  followers?: number;
  rating?: number;
  publishedAt?: string;
  readingTime?: string;
  genre?: string;
  avatarUrl?: string | null;
};

const AuthorDetails: FC<Properties> = ({
  name = 'Charlie Culhane',
  followers = 10,
  rating = 700,
  publishedAt = '2023-09-04T12:53:07.144Z',
  readingTime = '7 min',
  genre = 'Fiction',
  avatarUrl = null,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.authorWrapper}>
        <div className={styles.avatarWrapper}>
          <Avatar username={name} avatarUrl={avatarUrl} />
        </div>
        <div>
          <h2 className={styles.authorName}>{name}</h2>
          <ul className={styles.authorInfoWrapper}>
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
      <div className={styles.articleInfoWrapper}>
        <div className={styles.articleInfoListWrapper}>
          <Icon iconName="notes" />
          <ul className={styles.articleInfoList}>
            <li className={styles.articleInfoItem}>
              <span>
                {getFormattedDate(publishedAt, DateFormat.DAY_SHORT_MONTH)}
              </span>
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

export { AuthorDetails };
