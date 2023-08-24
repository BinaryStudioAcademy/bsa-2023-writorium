import ArticlePreview from '~/assets/img/article-preview.png';
import { AppRoute } from '~/libs/enums/app-route.enum.js';

import { Avatar } from '../avatar/avatar.js';
import { Icon, Link } from '../components.js';
import styles from './styles.module.scss';

const ArticleCard: React.FC = () => (
  <article>
    <div>
      <div>
        <Link to={AppRoute.PROFILE} className={styles.avatarInfo}>
          <Avatar username="Nolan Sarls" avatarUrl={null} />
        </Link>
        Nolan Sarls
        <span>May 28</span>
        <span>7 min read</span>
        <Icon iconName="favorite" />
      </div>
    </div>
    <div>
      <div>
        <h4>Modern Full-Stack Developer Tech Stack 2021</h4>
        <p>
          The developer technology landscape changes all the time as new tools
          and technologies are introduced. After having lots of interviews and
          reading through countless job descriptions on job boards I think this
          is a great modern tech stack for JavaScript developers in 2021.
        </p>
        <div>
          <a href={AppRoute.ROOT}>IT</a>
          <a href={AppRoute.ROOT}>CODE</a>
          <a href={AppRoute.ROOT}>Humor</a>
          <a href={AppRoute.ROOT}>Work</a>
          <a href={AppRoute.ROOT}>Tech</a>
        </div>
      </div>
      <img
        src={ArticlePreview}
        alt="article preview"
        width="134"
        height="134"
      />
    </div>
    <div>
      <div>
        <Icon iconName="comment" />
        540
      </div>
      <div>
        <Icon iconName="view" />
        367K
      </div>
      <div>
        <Icon iconName="like" />
        36K
      </div>
      <div>
        <Icon iconName="dislike" />
        18K
      </div>
      <Icon iconName="share" />
      <Link to={AppRoute.ROOT}>
        Read more
      </Link>
    </div>
  </article>
);

export { ArticleCard };
