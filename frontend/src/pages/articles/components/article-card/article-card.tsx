import ArticlePreview from '~/assets/img/article-preview.png';
import { Avatar, Icon, Link } from '~/libs/components/components.js';
import { ShareOnFacebookButton } from '~/libs/components/share-on-facebook-icon/share-on-facebook-icon.js';
import { AppRoute, DateFormat } from '~/libs/enums/enums.js';
import { getFormattedDate, getFullName } from '~/libs/helpers/helpers.js';
import { type ArticleWithAuthorType } from '~/packages/articles/articles.js';
import { type UserDetailsResponseDto } from '~/packages/users/users.js';

import { type ReactionsType, type TagType } from '../../libs/types/types.js';
import { Tags } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  article: ArticleWithAuthorType;
  author: UserDetailsResponseDto;
  tags: TagType[];
  reactions: ReactionsType;
};

const ArticleCard: React.FC<Properties> = ({
  article,
  author,
  tags,
  reactions,
}) => {
  const { publishedAt, title, text } = article;
  const { comments, views, likes, dislikes } = reactions;
  const articleUrl = window.location.href;

  const MOCKED_READ_TIME = '7 min read';

  return (
    <article className={styles.article}>
      <div className={styles.header}>
        <div className={styles.info}>
          <Avatar
            username={getFullName(author.firstName, author.lastName)}
            avatarUrl={null}
          />
          <span className={styles.publisherName}>
            {getFullName(author.firstName, author.lastName)}
          </span>
          {publishedAt && (
            <span className={styles.publicationTime}>
              {getFormattedDate(publishedAt, DateFormat.DAY_SHORT_MONTH)}
            </span>
          )}
          <span className={styles.publicationTime}>{MOCKED_READ_TIME}</span>
        </div>
        <Icon iconName="favorite" className={styles.icon} />
      </div>
      <div className={styles.body}>
        <div className={styles.articleInfo}>
          <h4 className={styles.title}>{title}</h4>
          <p className={styles.text}>{text}</p>
          <Tags tags={tags} />
        </div>
        <img
          src={ArticlePreview}
          alt="article preview"
          className={styles.preview}
        />
      </div>
      <div className={styles.footer}>
        <ul className={styles.reactions}>
          <li className={styles.reaction}>
            <Icon iconName="comment" className={styles.reactionIcon} />
            <span className={styles.reactionCount}>{comments}</span>
          </li>
          <li className={styles.reaction}>
            <Icon iconName="view" className={styles.reactionIcon} />
            <span className={styles.reactionCount}>{views}</span>
          </li>
          <li className={styles.reaction}>
            <Icon iconName="like" className={styles.reactionIcon} />
            <span className={styles.reactionCount}>{likes}</span>
          </li>
          <li className={styles.reaction}>
            <Icon iconName="dislike" className={styles.reactionIcon} />
            <span className={styles.reactionCount}>{dislikes}</span>
          </li>
        </ul>
        <Icon iconName="share" className={styles.icon} />
        <ShareOnFacebookButton
          title={title}
          size="18"
          articleUrl={articleUrl}
          bgColor="rgba(255 255 255 / 0)"
          iconColor="#44996B"
        />
        <Link to={AppRoute.ROOT} className={styles.readMore}>
          Read more
        </Link>
      </div>
    </article>
  );
};

export { ArticleCard };
