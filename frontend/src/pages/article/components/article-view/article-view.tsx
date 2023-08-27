import ArticleBanner from '~/assets/img/article-banner.jpg';
import { IconButton } from '~/libs/components/icon-button/icon-button.jsx';
import { Tag } from '~/libs/components/tag/tag.jsx';

import { type ArticleType, type TagType } from './libs/types/types.js';
import styles from './styles.module.scss';

const MOCKED_TEXT = `Envision this: there is a technology currently undergoing testing that, when released to the public, will become a long-awaited revolution in energy. This new technology promises to be safer and more efficient than anything we have on the market now. It  will affect that which we consider mundane — power tools, toys, laptops, smartphones — 
and that which we consider exceptional — medical devices, spacecraft, and the innovative new vehicle designs needed to wean us off of fossil fuels. We have known about this  technology for centuries, yet until now we have only been able to take small steps towards its creation. Billions of dollars are pouring into research and billions more will be made once the 
technology has been perfected and released.

This description may sound a lot like that of fusion power. Yet it’s actually referring to the upcoming innovations in the realm of battery technology — specifically that of solid-state batteries. And while both fusion power and solid-state batteries have been labeled technologies of the future but never of today, advancements and investments in solid-state 
materials have increased tremendously over the years. Today not only are there many major companies and credible researchers involved, it seems we may finally start seeing these batteries released in just the next few years.

What can we expect once this elusive, transformative technology is finally ready for mass production?`;

const MOCKED_TAGS: TagType[] = [
  { id: 1, name: 'IT' },
  { id: 2, name: 'CODE' },
  { id: 3, name: 'Humor' },
  { id: 4, name: 'Work' },
  { id: 5, name: 'Tech' },
];

const MOCKED_ARTICLE = {
  title: 'Modern Full-Stack Developer Tech Stack 2021',
  text: MOCKED_TEXT,
  tags: MOCKED_TAGS,
};

type Properties = {
  article?: ArticleType;
};

const ArticleView: React.FC<Properties> = ({ article = MOCKED_ARTICLE }) => {
  const { title, text, tags } = article;

  /* TODO: handlers for buttons clicked events*/
  // const handleFavoriteClick = () => {};
  // const handleCommentClick = () => {};
  // const handleShareClick = () => {};

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
          />
          <IconButton
            iconName="comment"
            className={styles.iconButton}
            iconClassName={styles.icon}
          />
          <IconButton
            iconName="share"
            className={styles.iconButton}
            iconClassName={styles.icon}
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
