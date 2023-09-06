import ArticleBanner from '~/assets/img/article-banner.jpg';
import { IconButton, Tag } from '~/libs/components/components.js';
import { type ArticleType } from '~/libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  article: ArticleType;
};

const onButtonClick = (): void => {
  /**
   * @todo implement handle logic for buttons clicked events(favorite, comment, share)
   */
};

const ArticleView: React.FC<Properties> = ({ article }) => {
  const { title, text, tags } = article;

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
