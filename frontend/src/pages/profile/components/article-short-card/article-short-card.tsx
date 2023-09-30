import { type FC } from 'react';

import { Icon, Link } from '~/libs/components/components.js';
import { AppRoute, LinkHash } from '~/libs/enums/enums.js';
import {
  configureString,
  getReactionsInfo,
  getValidClassNames,
} from '~/libs/helpers/helpers.js';
import { type ArticleWithCountsResponseDto } from '~/packages/articles/articles.js';

import styles from './styles.module.scss';

type Properties = {
  article: ArticleWithCountsResponseDto;
  className?: string;
};

const ArticleShortCard: FC<Properties> = ({
  article: {
    id,
    title,
    reactions,
    userId,
    commentCount,
    viewCount,
    publishedAt,
  },
  className,
}) => {
  const { likesCount, dislikesCount } = getReactionsInfo(userId, reactions);

  const articleRouteById = configureString(AppRoute.ARTICLES_$ID, {
    id: String(id),
  }) as typeof AppRoute.ARTICLES_$ID;

  return (
    <div className={getValidClassNames(className, styles.card)}>
      <h3 className={styles.title}>
        <Link className={styles.titleLink} to={articleRouteById}>
          {title}
        </Link>
      </h3>
      <ul className={styles.reactions}>
        {publishedAt ? (
          <>
            <li className={styles.reaction}>
              <Link
                to={{
                  pathname: articleRouteById,
                  hash: LinkHash.COMMENTS,
                }}
                className={styles.reaction}
              >
                <Icon iconName="comment" />
                <span className={styles.reactionText}>{commentCount}</span>
              </Link>
            </li>
            <li className={styles.reaction}>
              <Icon iconName="view" />
              <span className={styles.reactionText}>{viewCount}</span>
            </li>
            <li className={styles.reaction}>
              <Icon iconName="like" />
              <span className={styles.reactionText}>{likesCount}</span>
            </li>
            <li className={styles.reaction}>
              <Icon iconName="dislike" />
              <span className={styles.reactionText}>{dislikesCount}</span>
            </li>
          </>
        ) : (
          <p className={styles.draft}>draft</p>
        )}
      </ul>
    </div>
  );
};

export { ArticleShortCard };
