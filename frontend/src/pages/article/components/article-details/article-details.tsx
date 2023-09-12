import { type FC } from 'react';

import { Avatar, Icon } from '~/libs/components/components.js';
import { DateFormat } from '~/libs/enums/enums.js';
import { getFormattedDate } from '~/libs/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
  authorName?: string;
  authorFollowers?: number;
  authorRating?: number;
  publishedAt?: string;
  readTime?: number | null;
  genre?: string;
};

const ArticleDetails: FC<Properties> = ({
  authorName = 'Charlie Culhane',
  authorFollowers = 10,
  authorRating = 700,
  publishedAt = '2023-09-04T12:53:07.144Z',
  readTime,
  genre = 'Fiction',
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.authorWrapper}>
        <div className={styles.avatarWrapper}>
          <Avatar username={authorName} avatarUrl={null} />
        </div>
        <div>
          <h2 className={styles.authorName}>{authorName}</h2>
          <ul className={styles.authorInfoWrapper}>
            <li className={styles.authorInfo}>
              <Icon iconName="renew" />
              <span className={styles.authorInfoValue}>{authorFollowers}</span>
              following
            </li>
            <li className={styles.authorInfo}>
              <Icon iconName="star" />
              <span className={styles.authorInfoValue}>{authorRating}</span>
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
            {readTime && (
              <li className={styles.articleInfoItem}>
                <span className={styles.articleReadTimeValue}>{readTime}</span>
                min read
              </li>
            )}
          </ul>
        </div>
        <Icon iconName="sparkles" />
        <span className={styles.articleGenre}>{genre}</span>
      </div>
    </div>
  );
};

export { ArticleDetails };