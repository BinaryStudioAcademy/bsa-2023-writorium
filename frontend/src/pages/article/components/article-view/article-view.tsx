import { Link as RouterLink } from 'react-router-dom';

import {
  IconButton,
  ShareOnFacebookButton,
  Tags,
} from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { getValidClassNames, sanitizeHtml } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useCallback,
  useNavigate,
  useParams,
} from '~/libs/hooks/hooks.js';
import { type TagType } from '~/libs/types/types.js';
import { type ArticleWithCommentCountResponseDto } from '~/packages/articles/articles.js';
import { actions as articlesActions } from '~/slices/articles/articles.js';

import { PREVIOUS_PAGE_INDEX } from '../../libs/constants/constants.js';
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
  const navigate = useNavigate();

  const handleShareButtonClick = useCallback((): void => {
    if (id) {
      void dispatch(articlesActions.shareArticle({ id }));
    }
  }, [dispatch, id]);

  const handleDeleteArticle = useCallback((): void => {
    void dispatch(articlesActions.deleteArticle(Number(id)))
      .unwrap()
      .then(() => {
        navigate(PREVIOUS_PAGE_INDEX);
      });
  }, [dispatch, id, navigate]);

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
                <RouterLink
                  to={AppRoute.EDIT_ARTICLE.replace(':id', id as string)}
                  state={article}
                >
                  <IconButton
                    iconName="edit"
                    className={styles.iconButton}
                    iconClassName={styles.icon}
                    onClick={onButtonClick}
                  />
                </RouterLink>
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
      <div className={styles.textWrapper}>
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
