import {
  Icon,
  IconButton,
  Link,
  Popover,
  ShareOnFacebookButton,
  Tags,
} from '~/libs/components/components.js';
import { EMPTY_STRING } from '~/libs/constants/constants.js';
import { AppRoute, LinkHash, Reaction } from '~/libs/enums/enums.js';
import {
  configureString,
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
  useParams,
} from '~/libs/hooks/hooks.js';
import { type TagType, type ValueOf } from '~/libs/types/types.js';
import {
  type ArticleWithFollowResponseDto,
  type ReactionResponseDto,
} from '~/packages/articles/articles.js';
import { type UserAuthResponseDto } from '~/packages/users/users.js';
import { ConfirmArticleDeleteDialog } from '~/pages/libs/components/components.js';
import { actions as articlesActions } from '~/slices/articles/articles.js';

import { ArticleDetails } from '../article-details/article-details.js';
import styles from './styles.module.scss';

type Properties = {
  tags: TagType[] | null;
  isShared?: boolean;
  article: ArticleWithFollowResponseDto;
  isArticleOwner?: boolean;
  onFollow?: () => void;
  reactions?: ReactionResponseDto[];
  authorName: string;
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
  reactions = [],
  authorName,
}) => {
  const { text, title, coverUrl, author, readTime, genre, publishedAt } =
    article;
  const { firstName, lastName, avatarUrl, followersCount, isFollowed } = author;
  const authorFullName = getFullName(firstName, lastName);
  const articleUrl = window.location.href;

  const { id } = useParams();

  const user = useAppSelector(({ auth }) => auth.user) as UserAuthResponseDto;

  const dispatch = useAppDispatch();

  const { handleToggleModalOpen, isOpen } = useModal();

  const handleShareButtonClick = useCallback((): void => {
    if (id) {
      void dispatch(articlesActions.shareArticle({ id }));
    }
  }, [dispatch, id]);

  const handleDeleteArticle = useCallback((): void => {
    void dispatch(
      articlesActions.deleteArticle({ id: Number(id), hasRedirect: true }),
    );
  }, [dispatch, id]);

  const { likesCount, dislikesCount, hasAlreadyReactedWith } = isShared
    ? { likesCount: null, dislikesCount: null, hasAlreadyReactedWith: null }
    : getReactionsInfo(user.id, reactions);

  const handleReaction = (reaction: ValueOf<typeof Reaction>): void => {
    if (isArticleOwner) {
      return;
    }

    if (hasAlreadyReactedWith === reaction) {
      return void dispatch(
        articlesActions.deleteArticleReaction({
          isLike: getReactionConvertedToBoolean(reaction),
          articleId: Number(id),
        }),
      );
    }

    void dispatch(
      articlesActions.reactToArticle({
        isLike: getReactionConvertedToBoolean(reaction),
        articleId: Number(id),
      }),
    );
  };

  const handleLikeReaction = (): void => {
    handleReaction(Reaction.LIKE);
  };

  const handleDislikeReaction = (): void => {
    handleReaction(Reaction.DISLIKE);
  };

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

            <Link
              to={{ hash: LinkHash.COMMENTS }}
              state={article}
              className={styles.iconButton}
            >
              <Icon iconName="comment" className={styles.icon} />
            </Link>

            <IconButton
              iconName="share"
              className={styles.iconButton}
              iconClassName={styles.icon}
              onClick={handleShareButtonClick}
            />
            <ShareOnFacebookButton
              title={title}
              articleUrl={articleUrl}
              iconStyle={getValidClassNames(
                styles.iconButton,
                styles.facebookIconButton,
              )}
            />
            <IconButton
              iconName="like"
              iconClassName={styles.icon}
              className={getValidClassNames(
                styles.reactionIcon,
                isArticleOwner && styles.disabled,
                hasAlreadyReactedWith === Reaction.LIKE && styles.pressed,
              )}
              label={String(likesCount)}
              onClick={handleLikeReaction}
            />
            <IconButton
              iconName="dislike"
              iconClassName={styles.icon}
              className={getValidClassNames(
                styles.reactionIcon,
                isArticleOwner && styles.disabled,
                hasAlreadyReactedWith === Reaction.DISLIKE && styles.pressed,
              )}
              label={String(dislikesCount)}
              onClick={handleDislikeReaction}
            />
          </div>
        )}
      </div>
      <Popover
        content={
          <ArticleDetails
            readTime={readTime}
            authorName={authorFullName}
            publishedAt={publishedAt ?? EMPTY_STRING}
            genre={genre}
            avatarUrl={avatarUrl}
            containerStyle={styles.articleDetailsContainer}
            isArticleOwner={isArticleOwner}
            onFollow={onFollow}
            authorFollowers={followersCount}
            isFollowed={isFollowed}
          />
        }
        className={getValidClassNames(
          styles.authorDetails,
          styles.authorDetailsModal,
        )}
      >
        <h5 className={styles.authorName}>{authorFullName}</h5>
      </Popover>

      <div className={styles.textWrapper}>
        <h2 className={styles.onlyForPrint}>{authorName}</h2>

        <h4 className={styles.title}>{title}</h4>
        {tags && <Tags tags={tags} />}
        <article
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(text) }}
        />
      </div>
      <ConfirmArticleDeleteDialog
        onDeleteArticle={handleDeleteArticle}
        trigger={{ onToggleModalOpen: handleToggleModalOpen, isOpen }}
      />
    </article>
  );
};

export { ArticleView };
