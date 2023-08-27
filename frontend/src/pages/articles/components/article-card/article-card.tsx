import ArticlePreview from '~/assets/img/article-preview.png';
import { Avatar, Icon, Link, Tag } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { type UserSignUpResponseDto } from '~/packages/users/users.js';

import { type ArticleType, type TagType } from './libs/types/types.js';
import styles from './styles.module.scss';

type Properties = {
  article: ArticleType;
  user: UserSignUpResponseDto;
};

const MOCKED_TEXT: string = `The developer technology landscape changes all the time as new tools
  and technologies are introduced. After having lots of interviews and
  reading through countless job descriptions on job boards I think this
  is a great modern tech stack for JavaScript developers in 2021.`;

const MOCKED_TAGS: TagType[] = [
  { id: 1, name: 'IT' },
  { id: 2, name: 'CODE' },
  { id: 3, name: 'Humor' },
  { id: 4, name: 'Work' },
  { id: 5, name: 'Tech' },
];

const MOCKED_ARTICLE: ArticleType = {
  publishedAt: 'May 28',
  timeSincePublication: '7 min read',
  title: 'Modern Full-Stack Developer Tech Stack 2021',
  text: MOCKED_TEXT,
  comments: '540',
  views: '367K',
  likes: '36K',
  dislikes: '18K',
  tags: MOCKED_TAGS,
};

const MOCKED_USER: UserSignUpResponseDto = {
  id: 7,
  email: 'nolanaris@gmail.com',
  firstName: 'Nolan',
  lastName: 'Saris',
};

const ArticleCard: React.FC<Properties> = ({
  article = MOCKED_ARTICLE,
  user = MOCKED_USER,
}) => {
  const {
    publishedAt = 'May 28',
    timeSincePublication = '7 min read',
    title = 'Modern Full-Stack Developer Tech Stack 2021',
    text = MOCKED_TEXT,
    comments = '540',
    views = '367K',
    likes = '36K',
    dislikes = '18K',
    tags: propertyTags,
  } = article;

  const { firstName, lastName } = user;
  const fullName = `${firstName} ${lastName}`;
  const tags = propertyTags.map((tag) => <Tag key={tag.id} name={tag.name} />);

  return (
    <article className={styles.article}>
      <div className={styles.header}>
        <div className={styles.info}>
          <Link to={AppRoute.PROFILE}>
            <Avatar username={fullName} avatarUrl={null} />
          </Link>
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
          <div className={styles.tags}>{tags}</div>
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
            <span className={styles.reactionCount}>{comments}</span>
          </div>
          <div className={styles.reaction}>
            <Icon iconName="view" className={styles.reactionIcon} />
            <span className={styles.reactionCount}>{views}</span>
          </div>
          <div className={styles.reaction}>
            <Icon iconName="like" className={styles.reactionIcon} />
            <span className={styles.reactionCount}>{likes}</span>
          </div>
          <div className={styles.reaction}>
            <Icon iconName="dislike" className={styles.reactionIcon} />
            <span className={styles.reactionCount}>{dislikes}</span>
          </div>
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
