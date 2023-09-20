import {
  IconButton,
  Link,
  Popover,
  ShareOnFacebookButton,
  Tags,
} from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import {
  configureString,
  getFullName,
  getValidClassNames,
  sanitizeHtml,
} from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useCallback,
  useModal,
  useParams,
} from '~/libs/hooks/hooks.js';
import { type TagType } from '~/libs/types/types.js';
import {
  type ArticleWithCommentCountResponseDto,
  type ArticleWithRelationsType,
} from '~/packages/articles/articles.js';
import { ConfirmArticleDeleteDialog } from '~/pages/libs/components/components.js';
import { actions as articlesActions } from '~/slices/articles/articles.js';

import { ArticleDetails } from '../article-details/article-details.js';
import styles from './styles.module.scss';

type Properties = {
  tags: TagType[] | null;
  isShared?: boolean;
  article:
    | Required<ArticleWithRelationsType>
    | ArticleWithCommentCountResponseDto;
  isArticleOwner?: boolean;
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
}) => {
  const { text, title, coverUrl, author, readTime, genre, publishedAt } =
    article;
  const { firstName, lastName, avatarUrl } = author;
  const authorFullName = getFullName(firstName, lastName);
  const articleUrl = window.location.href;

  const { id } = useParams();

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

  const handleDeleteButtonClick = useCallback((): void => {
    if (!isOpen) {
      handleToggleModalOpen();
    }
  }, [handleToggleModalOpen, isOpen]);

  return (
    <div
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
                    onClick={onButtonClick}
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
            <IconButton
              iconName="comment"
              className={styles.iconButton}
              iconClassName={styles.icon}
              onClick={onButtonClick}
            />
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
          />
        }
        className={getValidClassNames(
          styles.authorDetails,
          styles.authorDetailsModal,
        )}
      >
        <h5 className={styles.presentationAuthorName}>{authorFullName}</h5>
      </Popover>
      <div className={styles.textWrapper}>
        <h4 className={styles.title}>{title}</h4>
        {tags && <Tags tags={tags} />}
        <p
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(text) }}
        />
      </div>
      <ConfirmArticleDeleteDialog
        onDeleteArticle={handleDeleteArticle}
        trigger={{ onToggleModalOpen: handleToggleModalOpen, isOpen }}
      />
    </div>
  );
};

export { ArticleView };
