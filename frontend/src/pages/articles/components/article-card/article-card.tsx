import ArticlePreview from '~/assets/img/article-preview.png';
import { Avatar, Icon, Link, Tag } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { type UserAuthResponseDto } from '~/packages/users/users.js';
import { type ArticleType } from '~/pages/articles/libs/types/types.js';

import { Reaction } from '../components.js';
import { REACTIONS_LIST } from './libs/constants.js';
import styles from './styles.module.scss';

type Properties = {
  article: ArticleType;
  user: UserAuthResponseDto;
};

const ArticleCard: React.FC<Properties> = ({ article, user }) => {
  const { publishedAt, timeSincePublication, title, text, tags } = article;

  const { firstName, lastName } = user;
  const fullName = `${firstName} ${lastName}`;
  const renderTags = tags.map((tag) => <Tag key={tag.id} name={tag.name} />);
  const renderReactions = REACTIONS_LIST.map((reaction) => (
    <Reaction
      key={reaction.reaction}
      iconName={reaction.iconName}
      reactions={article[reaction.reaction]}
    />
  ));
  return (
    <article className={styles.article}>
      <div className={styles.header}>
        <div className={styles.info}>
          <Avatar username={fullName} avatarUrl={null} />
          <span className={styles.publisherName}>{fullName}</span>
          <span className={styles.publicationTime}>{publishedAt}</span>
          <span className={styles.publicationTime}>{timeSincePublication}</span>
        </div>
        <Icon iconName="favorite" className={styles.favoriteIcon} />
      </div>
      <div className={styles.body}>
        <div>
          <h4 className={styles.title}>{title}</h4>
          <p className={styles.text}>{text}</p>
          <div className={styles.tags}>{renderTags}</div>
        </div>
        <img
          src={ArticlePreview}
          alt="article preview"
          className={styles.preview}
        />
      </div>
      <div className={styles.footer}>
        <div className={styles.reactions}>
          {renderReactions}
          <Icon iconName="share" className={styles.reactionIcon} />
        </div>
        <Link to={AppRoute.ROOT} className={styles.readMore}>
          Read more
        </Link>
      </div>
    </article>
  );
};

export { ArticleCard };
