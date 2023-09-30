import {
  CommentCard,
  IconButton,
  Layout,
  Loader,
  Navigate,
  ScrollToTop,
} from '~/libs/components/components.js';
import {
  AppRoute,
  DataStatus,
  LinkHash,
  Reaction,
} from '~/libs/enums/enums.js';
import {
  getFullName,
  getReactionConvertedToBoolean,
  getReactionsInfo,
  getValidClassNames,
} from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useArticleRoom,
  useCallback,
  useEffect,
  useLocation,
  useParams,
} from '~/libs/hooks/hooks.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type ArticleWithFollowResponseDto } from '~/packages/articles/articles.js';
import { type CommentBaseRequestDto } from '~/packages/comments/comments.js';
import { type UserAuthResponseDto } from '~/packages/users/users.js';
import { actions as articleActions } from '~/slices/articles/articles.js';
import { actions as userActions } from '~/slices/users/users.js';

import {
  ArticleDetails,
  ArticleView,
  CommentForm,
} from './components/components.js';
import { getArticleViewTags } from './libs/helpers/helpers.js';
import styles from './styles.module.scss';

const ArticlePage: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const {
    article,
    getArticleStatus,
    articleComments,
    fetchArticleCommentsDataStatus,
    createCommentDataStatus,
    user,
  } = useAppSelector(({ articles, auth }) => ({
    article: articles.article as ArticleWithFollowResponseDto,
    getArticleStatus: articles.getArticleStatus,
    articleComments: articles.articleComments,
    fetchArticleCommentsDataStatus: articles.fetchArticleCommentsDataStatus,
    createCommentDataStatus: articles.createCommentDataStatus,
    user: auth.user as UserAuthResponseDto,
  }));

  const hasComments = Boolean(articleComments.length);
  const isArticleOwner = user?.id === article?.userId;

  const { id } = useParams();

  useArticleRoom(Number(id));

  const scrollToComments = useCallback(() => {
    const { hash } = location;
    const element = hash ? document.querySelector(hash) : null;

    if (hash && element) {
      element.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });
    }
  }, [location]);

  useEffect(() => {
    void dispatch(articleActions.getArticle(Number(id))).then(scrollToComments);

    void dispatch(articleActions.fetchAllCommentsToArticle(Number(id)));

    return () => {
      void dispatch(articleActions.resetComments());
    };
  }, [dispatch, id, scrollToComments]);

  const handleCreateComment = useCallback(
    (payload: Omit<CommentBaseRequestDto, 'articleId'>): void => {
      void dispatch(
        articleActions.createComment({ ...payload, articleId: article.id }),
      );
    },
    [article, dispatch],
  );

  const handleFollow = useCallback((): void => {
    void dispatch(
      userActions.toggleFollowAuthor({
        authorId: article.userId,
        authorName: getFullName(
          article.author.firstName,
          article.author.lastName,
        ),
      }),
    );
  }, [article, dispatch]);

  const isLoading =
    getArticleStatus === DataStatus.PENDING ||
    fetchArticleCommentsDataStatus === DataStatus.PENDING;

  const isLoaded =
    getArticleStatus === DataStatus.FULFILLED ||
    getArticleStatus === DataStatus.REJECTED ||
    fetchArticleCommentsDataStatus === DataStatus.FULFILLED ||
    fetchArticleCommentsDataStatus === DataStatus.REJECTED;

  if (!article && !isLoading && isLoaded) {
    return <Navigate to={AppRoute.ARTICLES} />;
  }

  if (getArticleStatus === DataStatus.REJECTED) {
    return null;
  }

  const { likesCount, dislikesCount, hasAlreadyReactedWith } = getReactionsInfo(
    user.id,
    article?.reactions ?? [],
  );

  const handleReaction = (reaction: ValueOf<typeof Reaction>): void => {
    if (isArticleOwner) {
      return;
    }

    if (hasAlreadyReactedWith === reaction) {
      return void dispatch(
        articleActions.deleteArticleReaction({
          isLike: getReactionConvertedToBoolean(reaction),
          articleId: Number(id),
        }),
      );
    }

    void dispatch(
      articleActions.reactToArticle({
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

  return (
    <Loader isLoading={isLoading} hasOverlay type="circular">
      <Layout>
        <div className={styles.articlePageWrapper}>
          {article && (
            <>
              <ArticleView
                tags={getArticleViewTags(article)}
                isArticleOwner={isArticleOwner}
                article={article}
                onFollow={handleFollow}
                onLikeReaction={handleLikeReaction}
                onDislikeReaction={handleDislikeReaction}
                likesCount={String(likesCount)}
                dislikesCount={String(dislikesCount)}
                hasAlreadyReactedWith={hasAlreadyReactedWith}
                authorName={getFullName(
                  article.author.firstName,
                  article.author.lastName,
                )}
              />
              <ArticleDetails
                readTime={article.readTime}
                authorName={getFullName(
                  article.author.firstName,
                  article.author.lastName,
                )}
                publishedAt={article.publishedAt}
                genre={article.genre}
                avatarUrl={article.author.avatarUrl}
                isArticleOwner={isArticleOwner}
                onFollow={handleFollow}
                authorFollowers={article.author.followersCount}
                isFollowed={article.author.isFollowed}
              />
            </>
          )}
          {article?.publishedAt && (
            <>
              <div className={styles.commentsBlockWrapper}>
                <h2
                  className={getValidClassNames(
                    styles.anchor,
                    'visually-hidden',
                  )}
                  id={LinkHash.COMMENTS}
                >
                  Comments
                </h2>
                {hasComments && (
                  <p className={styles.commentCount}>
                    Discussion ({articleComments.length})
                  </p>
                )}
                <CommentForm
                  onSubmit={handleCreateComment}
                  isLoading={createCommentDataStatus === DataStatus.PENDING}
                />
                {hasComments && (
                  <ul className={styles.commentList}>
                    {articleComments.map(({ author, ...comment }) => (
                      <li key={comment.id}>
                        <CommentCard user={author} comment={comment} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className={styles.reactionButtonsWrapper}>
                <IconButton
                  iconName="like"
                  iconClassName={styles.reactionIcon}
                  className={getValidClassNames(
                    styles.reactionButton,
                    isArticleOwner && styles.disabled,
                    hasAlreadyReactedWith === Reaction.LIKE && styles.pressed,
                  )}
                  label={String(likesCount)}
                  onClick={handleLikeReaction}
                />
                <IconButton
                  iconName="dislike"
                  iconClassName={styles.reactionIcon}
                  className={getValidClassNames(
                    styles.iconButton,
                    styles.reactionButton,
                    isArticleOwner && styles.disabled,
                    hasAlreadyReactedWith === Reaction.DISLIKE &&
                      styles.pressed,
                  )}
                  label={String(dislikesCount)}
                  onClick={handleDislikeReaction}
                />
              </div>
            </>
          )}
        </div>
      </Layout>
      <ScrollToTop />
    </Loader>
  );
};

export { ArticlePage };
