import {
  IconButton,
  ShareOnFacebookButton,
  Tag,
} from '~/libs/components/components.js';
import { getValidClassNames, sanitizeHtml } from '~/libs/helpers/helpers.js';
import { useAppDispatch, useCallback, useParams } from '~/libs/hooks/hooks.js';
import { type TagType } from '~/libs/types/types.js';
import { actions as articlesActions } from '~/slices/articles/articles.js';

import styles from './styles.module.scss';

type Properties = {
  title: string;
  text: string;
  tags: TagType[];
  coverUrl?: string;
  isShared?: boolean;
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
}) => {
  const articleUrl = window.location.href;

  const { id } = useParams();

  const dispatch = useAppDispatch();

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
      <div className={styles.articleContent}>
        <h4 className={styles.title}>{title}</h4>
        <div className={styles.tags}>
          {tags.map((tag) => (
            <Tag key={tag.id} name={tag.name} />
          ))}
        </div>
        <p
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(text) }}
        />
      </div>
    </div>
  );
};

export { ArticleView };
