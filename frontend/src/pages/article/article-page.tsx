import { CommentCard, Layout, Navigate } from '~/libs/components/components.js';
import { Loader } from '~/libs/components/loader/loader.js';
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
import { type ArticleType, type TagType } from '~/libs/types/types.js';
import { type ArticleResponseDto } from '~/packages/articles/articles.js';
import { type CommentBaseRequestDto } from '~/packages/comments/comments.js';
import {
  actions,
  actions as articleActions,
} from '~/slices/articles/articles.js';

import {
  ArticleView,
  AuthorDetails,
  CommentForm,
} from './components/components.js';
import styles from './styles.module.scss';

const ArticlePage: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { article, dataStatus, articleComments, commentsDataStatus } =
    useAppSelector(({ articles }) => ({
      article: articles.article as ArticleResponseDto,
      dataStatus: articles.dataStatus,
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
    void dispatch(actions.getArticle(Number(id)));
    void dispatch(actions.fetchAllCommentsToArticle(Number(id)));

    return () => {
      void dispatch(actions.resetComments());
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
    dataStatus === DataStatus.FULFILLED ||
    dataStatus == DataStatus.REJECTED ||
    commentsDataStatus === DataStatus.FULFILLED ||
    commentsDataStatus == DataStatus.REJECTED
  );

  if (!article && !isLoading) {
    return <Navigate to={AppRoute.ARTICLES} />;
  }

  if (dataStatus === DataStatus.REJECTED) {
    return null;
  }

  const MOCKED_TAGS: TagType[] = [
    { id: 1, name: 'IT' },
    { id: 2, name: 'CODE' },
    { id: 3, name: 'Humor' },
    { id: 4, name: 'Work' },
    { id: 5, name: 'Tech' },
  ];

  const { text, title, author } = article ?? {};

  return (
    <Loader isLoading={isLoading}>
      <Layout>
        <div className={styles.articlePageWrapper}>
          <ArticleView
            article={{ text, title, tags: MOCKED_TAGS } as ArticleType}
          />
          {author && (
            <AuthorDetails
              name={getFullName(author.firstName, author.lastName)}
            />
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
