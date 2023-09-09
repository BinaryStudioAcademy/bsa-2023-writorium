import { IconButton, Tag } from '~/libs/components/components.js';
import { ShareOnFacebookButton } from '~/libs/components/share-on-facebook-icon/share-on-facebook-icon.js';
import { getValidClassNames, sanitizeHtml } from '~/libs/helpers/helpers.js';
import { type TagType } from '~/libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  title: string;
  text: string;
  tags: TagType[];
  coverUrl?: string;
};

const onButtonClick = (): void => {
  /**
   * @todo implement handle logic for buttons clicked events(favorite, comment, share)
   */
};

const ArticleView: React.FC<Properties> = ({ title, text, tags, coverUrl }) => {
  const articleUrl = window.location.href;

  return (
    <div
      className={getValidClassNames(styles.body, coverUrl && styles.hasCover)}
    >
      <div className={styles.coverWrapper}>
        {coverUrl && (
          <img alt="article cover" className={styles.cover} src={coverUrl} />
        )}
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
          <ShareOnFacebookButton
            title={title}
            articleUrl={articleUrl}
            iconStyle={styles.facebookIconButton}
          />
        </div>
      </div>
      <div>
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
