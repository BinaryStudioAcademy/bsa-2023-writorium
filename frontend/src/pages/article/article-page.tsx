import {
  CommentCard,
  Layout,
  Loader,
  Navigate,
} from '~/libs/components/components.js';
import { AppRoute, DataStatus } from '~/libs/enums/enums.js';
import { getFullName } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useLocation,
  useParams,
} from '~/libs/hooks/hooks.js';
import { type TagType } from '~/libs/types/types.js';
import { type ArticleResponseDto } from '~/packages/articles/articles.js';
import { type CommentBaseRequestDto } from '~/packages/comments/comments.js';
import { actions as articleActions } from '~/slices/articles/articles.js';

import {
  ArticleDetails,
  ArticleView,
  CommentForm,
} from './components/components.js';
import styles from './styles.module.scss';

const ArticlePage: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { article, getArticleStatus, articleComments, commentsDataStatus } =
    useAppSelector(({ articles }) => ({
      article: articles.article as ArticleResponseDto,
      getArticleStatus: articles.getArticleStatus,
      articleComments: articles.articleComments,
      commentsDataStatus: articles.articleCommentsDataStatus,
    }));

  const hasComments = Boolean(articleComments.length);

  const { id } = useParams();

  useEffect(() => {
    const { hash } = location;
    const element = hash ? document.querySelector(hash) : null;

    if (hash && element) {
      element.scrollIntoView({
        block: 'start',
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

  const isLoading = !(
    getArticleStatus === DataStatus.FULFILLED ||
    getArticleStatus === DataStatus.REJECTED ||
    commentsDataStatus === DataStatus.FULFILLED ||
    commentsDataStatus === DataStatus.REJECTED
  );

  if (!article && !isLoading) {
    return <Navigate to={AppRoute.ARTICLES} />;
  }

  if (getArticleStatus === DataStatus.REJECTED) {
    return null;
  }

  const MOCKED_TAGS: TagType[] = [
    { id: 1, name: 'IT' },
    { id: 2, name: 'CODE' },
    { id: 3, name: 'Humor' },
    { id: 4, name: 'Work' },
    { id: 5, name: 'Tech' },
  ];

  return (
    <Loader isLoading={isLoading} hasOverlay type="circular">
      <Layout>
        <div className={styles.articlePageWrapper}>
          {article && (
            <>
              <ArticleView
                tags={MOCKED_TAGS}
                text={article.text}
                title={article.title}
                coverUrl={article.coverUrl}
              />
              <ArticleDetails
                readTime={article.readTime}
                authorName={getFullName(
                  article.author.firstName,
                  article.author.lastName,
                )}
                publishedAt={article.publishedAt ?? ''}
                genre={article.genre}
                avatarUrl={article.author.avatarUrl}
              />
            </>
          )}
          <div>
            <h2 className="visually-hidden" id="comments">
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
