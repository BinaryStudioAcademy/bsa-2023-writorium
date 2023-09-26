import {
  Icon,
  IconButton,
  Link,
  Popover,
  SharePopover,
  Tags,
} from '~/libs/components/components.js';
import { AppRoute, LinkHash, Reaction } from '~/libs/enums/enums.js';
import {
  configureString,
  getFullName,
  getValidClassNames,
  sanitizeHtml,
} from '~/libs/helpers/helpers.js';
import { useAppDispatch, useCallback, useModal } from '~/libs/hooks/hooks.js';
import { type Tag, type ValueOf } from '~/libs/types/types.js';
import { type ArticleWithFollowResponseDto } from '~/packages/articles/articles.js';
import { ConfirmArticleDeleteDialog } from '~/pages/libs/components/components.js';
import { actions as articlesActions } from '~/slices/articles/articles.js';

import { ArticleDetails } from '../article-details/article-details.js';
import styles from './styles.module.scss';

type Properties = {
  tags: Tag[] | null;
  isShared?: boolean;
  article: ArticleWithFollowResponseDto;
  isArticleOwner?: boolean;
  onFollow?: () => void;
  authorName: string;
  onLikeReaction?: () => void;
  onDislikeReaction?: () => void;
  likesCount?: string;
  dislikesCount?: string;
  hasAlreadyReactedWith?: ValueOf<typeof Reaction> | null;
};

const onButtonClick = (): void => {
  /**
   * @todo implement handle logic for buttons clicked events(favorite, comment, share)
   */
};

const ArticleView: React.FC<Properties> = ({
  tags,
  isShared = false,
  isArticleOwner,
  article,
  onFollow,
  authorName,
  onLikeReaction,
  onDislikeReaction,
  likesCount,
  dislikesCount,
  hasAlreadyReactedWith,
}) => {
  const { text, title, coverUrl, author, readTime, genre, publishedAt, id } =
    article;
  const { firstName, lastName, avatarUrl, followersCount, isFollowed } = author;
  const authorFullName = getFullName(firstName, lastName);
  const dispatch = useAppDispatch();

  const { handleToggleModalOpen, isOpen } = useModal();

  const handleDeleteArticle = useCallback((): void => {
    void dispatch(
      articlesActions.deleteArticle({ id: Number(id), hasRedirect: true }),
    );
  }, [dispatch, id]);

  const handleDeleteButtonClick = useCallback((): void => {
    if (!isOpen) {
      handleToggleModalOpen();
    }
  }, [handleToggleModalOpen, isOpen]);

  return (
    <article
      className={getValidClassNames(styles.body, coverUrl && styles.hasCover)}
    >
      <div className={styles.coverWrapper}>
        {coverUrl && (
          <img alt="article cover" className={styles.cover} src={coverUrl} />
        )}
        {!isShared && (
          <div className={styles.buttonsWrapper}>
            {isArticleOwner && (
              <>
                <IconButton
                  iconName="trashBin"
                  className={styles.iconButton}
                  iconClassName={styles.icon}
                  onClick={handleDeleteButtonClick}
                />
                <Link
                  to={
                    configureString(AppRoute.ARTICLES_EDIT_$ID, {
                      id: String(id),
                    }) as typeof AppRoute.ARTICLES_EDIT_$ID
                  }
                  state={article}
                >
                  <IconButton
                    iconName="edit"
                    className={styles.iconButton}
                    iconClassName={styles.icon}
                  />
                </Link>
              </>
            )}
            <IconButton
              iconName="favorite"
              className={styles.iconButton}
              iconClassName={styles.icon}
              onClick={onButtonClick}
            />

            {publishedAt && (
              <>
                <Link
                  to={{ hash: LinkHash.COMMENTS }}
                  state={article}
                  className={styles.iconButton}
                >
                  <Icon iconName="comment" className={styles.icon} />
                </Link>
                <SharePopover
                  articleId={id.toString()}
                  articleTitle={title}
                  classNameContentWrapper={styles.sharePopover}
                  classNameIconButton={styles.iconButton}
                  classNameIcon={styles.icon}
                />
              </>
            )}
          </div>
        )}
      </div>
      <Popover
        content={
          <ArticleDetails
            readTime={readTime}
            authorName={authorFullName}
            publishedAt={publishedAt ?? ''}
            genre={genre}
            avatarUrl={avatarUrl}
            containerStyle={styles.articleDetailsContainer}
            isArticleOwner={isArticleOwner}
            onFollow={onFollow}
            authorFollowers={followersCount}
            isFollowed={isFollowed}
            isShared={isShared}
          />
        }
        className={styles.popover}
        classNameContentWrapper={getValidClassNames(
          styles.authorDetails,
          styles.authorDetailsModal,
        )}
      >
        <h5 className={styles.authorName}>
          <span>{authorFullName}</span>
          <Icon iconName="info" className={styles.infoIcon} />
        </h5>
      </Popover>

      <div className={styles.textWrapper}>
        <h2 className={styles.onlyForPrint}>{authorName}</h2>

        <h4 className={styles.title}>{title}</h4>
        {tags && <Tags tags={tags} />}
        <article
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(text) }}
        />
        {!isShared && publishedAt && (
          <div className={styles.reactionButtonsWrapper}>
            <IconButton
              iconName="like"
              iconClassName={styles.reactionIcon}
              className={getValidClassNames(
                styles.reactionButton,
                isArticleOwner && styles.disabled,
                hasAlreadyReactedWith === Reaction.LIKE && styles.pressed,
              )}
              label={likesCount}
              onClick={onLikeReaction}
            />
            <IconButton
              iconName="dislike"
              iconClassName={styles.reactionIcon}
              className={getValidClassNames(
                styles.reactionButton,
                isArticleOwner && styles.disabled,
                hasAlreadyReactedWith === Reaction.DISLIKE && styles.pressed,
              )}
              label={dislikesCount}
              onClick={onDislikeReaction}
            />
          </div>
        )}
      </div>
      <ConfirmArticleDeleteDialog
        onDeleteArticle={handleDeleteArticle}
        trigger={{ onToggleModalOpen: handleToggleModalOpen, isOpen }}
      />
    </article>
  );
};

export { ArticleView };
