import { type FC } from 'react';

import { Avatar, Icon } from '~/libs/components/components.js';
import { DateFormat } from '~/libs/enums/enums.js';
import { getFormattedDate } from '~/libs/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
  authorName: string;
  authorFollowers?: number;
  authorRating?: number;
  publishedAt: string;
  readTime: number | null;
  genre: string | null;
  avatarUrl: string | null;
  customStyles?: CSSModuleClasses;
};

const ArticleDetails: FC<Properties> = ({
  authorName = 'Charlie Culhane',
  authorFollowers = 10,
  authorRating = 700,
  publishedAt,
  readTime,
  genre,
  avatarUrl = null,
  customStyles = styles,
}) => {
  return (
    <div className={customStyles.container}>
      <div className={customStyles.authorWrapper}>
        <div className={customStyles.avatarWrapper}>
          <Avatar username={authorName} avatarUrl={avatarUrl} />
        </div>
        <h2 className={customStyles.authorName}>{authorName}</h2>
        <ul className={customStyles.authorInfoWrapper}>
          <li className={customStyles.authorInfo}>
            <Icon iconName="renew" />
            <span className={customStyles.authorInfoValue}>
              {authorFollowers}
            </span>
            following
          </li>
          <li className={customStyles.authorInfo}>
            <Icon iconName="star" />
            <span className={customStyles.authorInfoValue}>{authorRating}</span>
            rating
          </li>
        </ul>
      </div>
      <div className={customStyles.articleInfoWrapper}>
        <div className={customStyles.articleInfoListWrapper}>
          <Icon iconName="notes" />
          <ul className={customStyles.articleInfoList}>
            <li className={customStyles.articleInfoItem}>
              <span>
                {getFormattedDate(publishedAt, DateFormat.MONTH_DATE_YEAR)}
              </span>
            </li>
            {readTime && (
              <li className={customStyles.articleInfoItem}>
                <span className={customStyles.articleReadTimeValue}>
                  {readTime}
                </span>
                min read
              </li>
            )}
          </ul>
        </div>
        <Icon iconName="sparkles" />
        <span className={customStyles.articleGenre}>{genre}</span>
      </div>
    </div>
  );
};

export { ArticleDetails };
