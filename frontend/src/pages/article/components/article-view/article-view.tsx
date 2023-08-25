import ArticleBanner from '~/assets/img/article-banner.jpg';

import styles from './styles.module.scss';

type ArticleType = {
  publishedAt: string;
  timeSincePublication: string;
  title: string;
  text: string;
  comments: string;
  views: string;
  likes: string;
  dislikes: string;
};

const MOCKED_TEXT = `Envision this: there is a technology currently undergoing testing that, when released to the public, will become a long-awaited revolution in energy. This new technology promises to be safer and more efficient than anything we have on the market now. It  will affect that which we consider mundane — power tools, toys, laptops, smartphones — 
and that which we consider exceptional — medical devices, spacecraft, and the innovative new vehicle designs needed to wean us off of fossil fuels. We have known about this  technology for centuries, yet until now we have only been able to take small steps towards its creation. Billions of dollars are pouring into research and billions more will be made once the 
technology has been perfected and released.

This description may sound a lot like that of fusion power. Yet it’s actually referring to the upcoming innovations in the realm of battery technology — specifically that of solid-state batteries. And while both fusion power and solid-state batteries have been labeled technologies of the future but never of today, advancements and investments in solid-state 
materials have increased tremendously over the years. Today not only are there many major companies and credible researchers involved, it seems we may finally start seeing these batteries released in just the next few years.

What can we expect once this elusive, transformative technology is finally ready for mass production?`;

const MOCKED_ARTICLE = {
  title: 'Modern Full-Stack Developer Tech Stack 2021',
  text: MOCKED_TEXT,
  publishedAt: 'May 28',
};

type Properties = {
  article?: ArticleType;
};

const ArticleView: React.FC<Properties> = ({ article = MOCKED_ARTICLE }) => {
  const {
    title = 'Modern Full-Stack Developer Tech Stack 2021',
    text = MOCKED_TEXT,
  } = article;

  return (
    <div className={styles.body}>
      <div className={styles.bannerWrapper}>
        <img
          src={ArticleBanner}
          alt="article banner"
          className={styles.banner}
        />
      </div>
      <h4 className={styles.title}>{title}</h4>
      <div className={styles.tags}>
        <span className={styles.tag}>IT</span>
        <span className={styles.tag}>CODE</span>
        <span className={styles.tag}>Humor</span>
        <span className={styles.tag}>Work</span>
        <span className={styles.tag}>Tech</span>
      </div>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export { ArticleView };
