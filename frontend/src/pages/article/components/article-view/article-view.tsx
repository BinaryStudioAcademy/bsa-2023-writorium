import ArticleBanner from '~/assets/img/article-banner.jpg';
import { IconButton } from '~/libs/components/icon-button/icon-button.jsx';
import { Tag } from '~/libs/components/tag/tag.jsx';
import { useAppDispatch, useCallback,useParams } from '~/libs/hooks/hooks.js';
import { type ArticleType } from '~/libs/types/types.js';
import { actions as articlesActions } from '~/slices/articles/articles.js';

import styles from './styles.module.scss';

type Properties = {
  article: ArticleType;
};

const ArticleView: React.FC<Properties> = ({ article }) => {
  const { title, text, tags } = article;

  const { id } = useParams();

  const dispatch = useAppDispatch();

  const onButtonClick = useCallback((): void => {
    /**
     * @todo implement handle logic for buttons clicked events(favorite, comment, share)
     */
    if (id) {
      void dispatch(articlesActions.shareArticle({ id }));
    }
  }, [dispatch, id]);

  return (
    <div className={styles.body}>
      <div className={styles.bannerWrapper}>
        <img
          src={ArticleBanner}
          alt="article banner"
          className={styles.banner}
        />
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
            onClick={onButtonClick}
          />
        </div>
      </div>
      <h4 className={styles.title}>{title}</h4>
      <div className={styles.tags}>
        {tags.map((tag) => (
          <Tag key={tag.id} name={tag.name} />
        ))}
      </div>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export { ArticleView };
