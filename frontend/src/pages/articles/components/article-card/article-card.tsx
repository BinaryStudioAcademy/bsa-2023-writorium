import {
  Avatar,
  Icon,
  IconButton,
  Link,
  Popover,
  SharePopover,
  Tags,
} from '~/libs/components/components.js';
import {
  AppRoute,
  DataStatus,
  DateFormat,
  LinkHash,
  Reaction,
} from '~/libs/enums/enums.js';
import {
  configureString,
  getFormattedDate,
  getFullName,
  getReactionConvertedToBoolean,
  getReactionsInfo,
  getValidClassNames,
  sanitizeHtml,
} from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useModal,
} from '~/libs/hooks/hooks.js';
import { type Tag, type ValueOf } from '~/libs/types/types.js';
import {
  type ArticleWithCountsResponseDto,
  getReadTimeString,
  type ReactionResponseDto,
} from '~/packages/articles/articles.js';
import {
  type UserAuthResponseDto,
  type UserDetailsResponseDto,
} from '~/packages/users/users.js';
import { ConfirmArticleDeleteDialog } from '~/pages/libs/components/components.js';
import { actions as articlesActions } from '~/slices/articles/articles.js';

import { PopoverButtonsGroup } from './libs/components/components.js';
import styles from './styles.module.scss';

type Properties = {
  article: ArticleWithCountsResponseDto;
  author: UserDetailsResponseDto;
  tags: Tag[];
  reactions: ReactionResponseDto[];
};

const ArticleCard: React.FC<Properties> = ({
  article,
  author,
  tags,
  reactions,
}) => {
  const dispatch = useAppDispatch();
  const { handleToggleModalOpen, isOpen } = useModal();
  const { user, articlesDataStatus } = useAppSelector(({ auth, articles }) => ({
    user: auth.user as UserAuthResponseDto,
    articlesDataStatus: articles.dataStatus,
  }));
  const isLoading = articlesDataStatus === DataStatus.PENDING;
  const {
    publishedAt,
    title,
    text,
    id,
    userId,
    coverUrl,
    readTime,
    commentCount,
    isFavourite,
    viewCount,
  } = article;
  const { likesCount, dislikesCount, hasAlreadyReactedWith } = getReactionsInfo(
    user.id,
    reactions,
  );
  const { firstName, lastName, avatarUrl } = author;
  const articleRouteById = configureString(AppRoute.ARTICLES_$ID, {
    id: String(id),
  }) as typeof AppRoute.ARTICLES_$ID;

  const handleToggleIsFavourite = useCallback(() => {
    void dispatch(articlesActions.toggleIsFavourite(id));
  }, [dispatch, id]);

  const isOwnArticle = user.id === userId;

  const handleReaction = (reaction: ValueOf<typeof Reaction>): void => {
    if (isOwnArticle) {
      return;
    }

    if (hasAlreadyReactedWith === reaction) {
      return void dispatch(
        articlesActions.deleteArticleReaction({
          isLike: getReactionConvertedToBoolean(reaction),
          articleId: id,
        }),
      );
    }

    void dispatch(
      articlesActions.reactToArticle({
        isLike: getReactionConvertedToBoolean(reaction),
        articleId: id,
      }),
    );
  };

  const handleLikeReaction = (): void => {
    handleReaction(Reaction.LIKE);
  };

  const handleDislikeReaction = (): void => {
    handleReaction(Reaction.DISLIKE);
  };

  const handleDeleteArticle = useCallback((): void => {
    void dispatch(articlesActions.deleteArticle({ id }));
  }, [dispatch, id]);

  const handleDeleteButtonClick = useCallback((): void => {
    if (!isOpen) {
      handleToggleModalOpen();
    }
  }, [handleToggleModalOpen, isOpen]);

  return (
    <article className={styles.article}>
      <div className={styles.header}>
        <div className={styles.info}>
          <Avatar
            className={styles.publisherAvatar}
            username={getFullName(firstName, lastName)}
            avatarUrl={avatarUrl}
          />
          <span className={styles.publisherName}>
            {getFullName(firstName, lastName)}
          </span>
          {publishedAt ? (
            <span className={styles.publicationTime}>
              {getFormattedDate(publishedAt, DateFormat.DAY_SHORT_MONTH)}
            </span>
          ) : (
            <span className={styles.publicationTime}>draft</span>
          )}
          {readTime && (
            <span className={styles.readTime}>
              {getReadTimeString(readTime)}
            </span>
          )}
        </div>
        <div className={styles.toolbar}>
          <IconButton
            className={styles.topActionsIcon}
            iconName={isFavourite ? 'favoriteFilled' : 'favorite'}
            onClick={handleToggleIsFavourite}
            isLoading={isLoading}
          />
          {isOwnArticle && (
            <Popover
              classNameContentWrapper={styles.moreActions}
              content={
                <PopoverButtonsGroup
                  isOwnArticle={isOwnArticle}
                  article={article}
                  onDeleteButtonClick={handleDeleteButtonClick}
                />
              }
            >
              <Icon
                className={styles.topActionsIcon}
                iconName="ellipsisVertical"
              />
            </Popover>
          )}
        </div>
      </div>
      <div
        className={getValidClassNames(styles.body, coverUrl && styles.hasCover)}
      >
        <div className={styles.articleInfo}>
          <h4 className={styles.title}>{title}</h4>
          <article
            className={getValidClassNames(styles.text, 'text-overflow')}
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(text),
            }}
          ></article>
        </div>
        {coverUrl && (
          <div className={styles.coverWrapper}>
            <img src={coverUrl} alt="article cover" className={styles.cover} />
          </div>
        )}
        <Tags className={styles.articleTags} tags={tags} />
      </div>
      <div className={styles.footer}>
        {publishedAt && (
          <>
            <ul className={styles.reactions}>
              <li>
                <Link
                  to={{
                    pathname: articleRouteById,
                    hash: LinkHash.COMMENTS,
                  }}
                >
                  <IconButton
                    iconName="comment"
                    className={styles.iconWrapper}
                    label={commentCount.toString()}
                  />
                </Link>
              </li>
              <li className={styles.footerIcon}>
                <Icon iconName="view" />
                <span>{viewCount}</span>
              </li>
              <li>
                <IconButton
                  iconName="like"
                  className={getValidClassNames(
                    styles.footerIcon,
                    isOwnArticle && styles.disabled,
                    hasAlreadyReactedWith === Reaction.LIKE && styles.pressed,
                  )}
                  label={String(likesCount)}
                  onClick={handleLikeReaction}
                />
              </li>
              <li>
                <IconButton
                  iconName="dislike"
                  className={getValidClassNames(
                    styles.footerIcon,
                    isOwnArticle && styles.disabled,
                    hasAlreadyReactedWith === Reaction.DISLIKE &&
                      styles.pressed,
                  )}
                  label={String(dislikesCount)}
                  onClick={handleDislikeReaction}
                />
              </li>
            </ul>
            <SharePopover
              articleId={id.toString()}
              articleTitle={title}
              classNameIconButton={styles.iconWrapper}
            />
          </>
        )}
        <Link to={articleRouteById} className={styles.readMore}>
          Read more
        </Link>
      </div>
      <ConfirmArticleDeleteDialog
        onDeleteArticle={handleDeleteArticle}
        trigger={{ onToggleModalOpen: handleToggleModalOpen, isOpen }}
      />
    </article>
  );
};

export { ArticleCard };
