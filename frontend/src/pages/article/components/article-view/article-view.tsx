import {
  IconButton,
  Link,
  ShareOnFacebookButton,
  Tags,
} from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import {
  configureString,
  getValidClassNames,
  sanitizeHtml,
} from '~/libs/helpers/helpers.js';
import { useAppDispatch, useCallback, useParams } from '~/libs/hooks/hooks.js';
import { type TagType } from '~/libs/types/types.js';
import { type ArticleWithCommentCountResponseDto } from '~/packages/articles/articles.js';
import { actions as articlesActions } from '~/slices/articles/articles.js';

import styles from './styles.module.scss';

type Properties = {
  title: string;
  text: string;
  tags: TagType[] | null;
  coverUrl: string | null;
  isShared?: boolean;
  isArticleOwner?: boolean;
  article?: ArticleWithCommentCountResponseDto;
};

const onButtonClick = (): void => {
  /**
   * @todo implement handle logic for buttons clicked events(favorite, comment, share)
   */
};

const ArticleView: React.FC<Properties> = ({
  title,
  text,
  tags,
  coverUrl,
  isShared = false,
  isArticleOwner,
  article,
}) => {
  const articleUrl = window.location.href;

  const { id } = useParams();

  const dispatch = useAppDispatch();

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
                  onClick={handleDeleteArticle}
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
      <div className={styles.articleContent}>
        <h4 className={styles.title}>{title}</h4>
        {tags && <Tags tags={tags} />}
        <p
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(text) }}
        />
      </div>
    </div>
  );
};

export { ArticleView };
