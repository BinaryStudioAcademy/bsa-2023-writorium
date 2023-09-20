import {
  CommentCard,
  Layout,
  Loader,
  Navigate,
} from '~/libs/components/components.js';
import { AppRoute, DataStatus, LinkHash } from '~/libs/enums/enums.js';
import { getFullName, getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useLocation,
  useParams,
} from '~/libs/hooks/hooks.js';
import { type ArticleWithFollowResponseDto } from '~/packages/articles/articles.js';
import { type CommentBaseRequestDto } from '~/packages/comments/comments.js';
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
    commentsDataStatus,
    user,
  } = useAppSelector(({ articles, auth }) => ({
    article: articles.article as ArticleWithFollowResponseDto,
    getArticleStatus: articles.getArticleStatus,
    articleComments: articles.articleComments,
    commentsDataStatus: articles.articleCommentsDataStatus,
    user: auth.user,
  }));

  const hasComments = Boolean(articleComments.length);
  const isArticleOwner = user?.id === article?.userId;

  const { id } = useParams();

  useEffect(() => {
    const { hash } = location;
    const element = hash ? document.querySelector(hash) : null;

    if (hash && element) {
      element.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });
    }
  }, [commentsDataStatus, location]);

  useEffect(() => {
    void dispatch(articleActions.getArticle(Number(id)));
    void dispatch(articleActions.fetchAllCommentsToArticle(Number(id)));

    return () => {
      void dispatch(articleActions.resetComments());
    };
  }, [dispatch, id]);

  const handleCreateComment = useCallback(
    (payload: Omit<CommentBaseRequestDto, 'articleId'>): void => {
      void dispatch(
        articleActions.createComment({ ...payload, articleId: article.id }),
      );
    },
    [article, dispatch],
  );

  const handleFollow = useCallback((): void => {
    void dispatch(userActions.toggleFollowAuthor(article.userId));
  }, [article, dispatch]);

  const isLoading =
    getArticleStatus === DataStatus.PENDING ||
    commentsDataStatus === DataStatus.PENDING;

  const isLoaded =
    getArticleStatus === DataStatus.FULFILLED ||
    getArticleStatus === DataStatus.REJECTED ||
    commentsDataStatus === DataStatus.FULFILLED ||
    commentsDataStatus === DataStatus.REJECTED;

  if (!article && !isLoading && isLoaded) {
    return <Navigate to={AppRoute.ARTICLES} />;
  }

  if (getArticleStatus === DataStatus.REJECTED) {
    return null;
  }

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
                reactions={article.reactions}
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
          <div className={styles.commentsBlockWrapper}>
            <h2
              className={getValidClassNames(styles.anchor, 'visually-hidden')}
              id={LinkHash.COMMENTS}
            >
              Comments
            </h2>
            {hasComments && (
              <p className={styles.commentCount}>
                Discussion ({articleComments.length})
              </p>
            )}
            <CommentForm onSubmit={handleCreateComment} />
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
        </div>
      </Layout>
    </Loader>
  );
};

export { ArticlePage };
