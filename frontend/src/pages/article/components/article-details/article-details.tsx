import { type FC } from 'react';

import { Avatar, Button, Icon } from '~/libs/components/components.js';
import { DateFormat, FollowStatus } from '~/libs/enums/enums.js';
import {
  getFormattedDate,
  getValidClassNames,
} from '~/libs/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
  authorName: string;
  authorFollowers: number;
  authorRating?: number;
  publishedAt: string | null;
  readTime: number | null;
  genre: string | null;
  avatarUrl: string | null;
  containerStyle?: string;
  isFollowed?: boolean;
  isArticleOwner?: boolean;
  onFollow?: () => void;
  isShared?: boolean;
};

const ArticleDetails: FC<Properties> = ({
  authorName,
  authorFollowers,
  authorRating = 700,
  publishedAt,
  readTime,
  genre,
  avatarUrl = null,
  isFollowed,
  containerStyle,
  isArticleOwner,
  onFollow,
  isShared = false,
}) => {
  return (
    <div className={getValidClassNames(styles.container, containerStyle)}>
      <div className={styles.authorWrapper}>
        <div className={styles.avatarWrapper}>
          <Avatar username={authorName} avatarUrl={avatarUrl} />
        </div>
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
        {!isArticleOwner && !isShared && (
          <Button
            className={styles.followButton}
            label={isFollowed ? FollowStatus.UNFOLLOW : FollowStatus.FOLLOW}
            onClick={onFollow}
          />
        )}
      </div>
      <div className={styles.articleInfoWrapper}>
        <div className={styles.articleInfoListWrapper}>
          <Icon iconName="notes" />
          <ul className={styles.articleInfoList}>
            <li className={styles.articleInfoItem}>
              <span>
                {publishedAt
                  ? getFormattedDate(publishedAt, DateFormat.MONTH_DATE_YEAR)
                  : 'draft'}
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
