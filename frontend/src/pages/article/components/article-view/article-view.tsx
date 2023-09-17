import {
  IconButton,
  Popover,
  ShareOnFacebookButton,
  Tags,
} from '~/libs/components/components.js';
import {
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
import { type ArticleWithRelationsType } from '~/packages/articles/articles.js';
import { actions as articlesActions } from '~/slices/articles/articles.js';

import { ArticleDetails } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  tags: TagType[] | null;
  isShared?: boolean;
  article: Required<ArticleWithRelationsType>;
};

const onButtonClick = (): void => {
  /**
   * @todo implement handle logic for buttons clicked events(favorite, comment, share)
   */
};

const ArticleView: React.FC<Properties> = ({
  tags,
  isShared = false,
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
      <h5
        role="presentation"
        className={styles.presentationAuthorName}
        onClick={handleToggleModalOpen}
      >
        {authorFullName}
      </h5>
      <Popover
        trigger={{ handleToggleModalOpen, isOpen }}
        content={
          <ArticleDetails
            readTime={readTime}
            authorName={authorFullName}
            publishedAt={publishedAt ?? ''}
            genre={genre}
            avatarUrl={avatarUrl}
            customStyles={styles}
          />
        }
        className={getValidClassNames(
          styles.authorDetails,
          styles.authorDetailsModal,
          isOpen && styles.open,
        )}
      />
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
