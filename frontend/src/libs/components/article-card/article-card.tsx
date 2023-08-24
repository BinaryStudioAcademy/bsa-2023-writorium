import ArticlePreview from '~/assets/img/article-preview.png';
import { AppRoute } from '~/libs/enums/app-route.enum.js';

import { Avatar } from '../avatar/avatar.js';
import { Icon, Link } from '../components.js';
import styles from './styles.module.scss';

const ArticleCard: React.FC = () => (
  <article className={styles.article}>
    <div className={styles.header}>
      <div className={styles.info}>
        <Link to={AppRoute.PROFILE}>
          <Avatar username="Nolan Sarls" avatarUrl={null} />
        </Link>
        <span className={styles.publisherName}>Nolan Sarls</span>
        <span className={styles.publicationTime}>May 28</span>
        <span className={styles.publicationTime}>7 min read</span>
      </div>
      <Icon iconName="favorite" className={styles.favoriteIcon} />
    </div>
    <div className={styles.body}>
      <div>
        <h4 className={styles.title}>
          Modern Full-Stack Developer Tech Stack 2021
        </h4>
        <p className={styles.content}>
          The developer technology landscape changes all the time as new tools
          and technologies are introduced. After having lots of interviews and
          reading through countless job descriptions on job boards I think this
          is a great modern tech stack for JavaScript developers in 2021.
        </p>
        <div className={styles.tags}>
          <span className={styles.tag}>IT</span>
          <span className={styles.tag}>CODE</span>
          <span className={styles.tag}>Humor</span>
          <span className={styles.tag}>Work</span>
          <span className={styles.tag}>Tech</span>
        </div>
      </div>
      <img
        src={ArticlePreview}
        alt="article preview"
        width="134"
        height="134"
        className={styles.preview}
      />
    </div>
    <div className={styles.footer}>
      <div className={styles.reactions}>
        <div className={styles.reaction}>
          <Icon iconName="comment" className={styles.reactionIcon} />
          <span className={styles.reactionCount}>540</span>
        </div>
        <div className={styles.reaction}>
          <Icon iconName="view" className={styles.reactionIcon} />
          <span className={styles.reactionCount}>367K</span>
        </div>
        <div className={styles.reaction}>
          <Icon iconName="like" className={styles.reactionIcon} />
          <span className={styles.reactionCount}>36K</span>
        </div>
        <div className={styles.reaction}>
          <Icon iconName="dislike" className={styles.reactionIcon} />
          <span className={styles.reactionCount}>18K</span>
        </div>
      </div>
      <Icon iconName="share" className={styles.reactionIcon} />
      <Link to={AppRoute.ROOT} className={styles.readMore}>
        Read more
      </Link>
    </div>
  </article>
);

export { ArticleCard };
