import { Button, Link } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useEffect, useLocation } from '~/libs/hooks/hooks.js';
import { type UserAuthResponseDto } from '~/packages/users/users.js';

import { ArticleCard } from './components/components.js';
import { type ArticleType, type TagType } from './libs/types/types.js';
import styles from './styles.module.scss';

const MOCKED_USER: UserAuthResponseDto = {
  id: 7,
  email: 'nolanaris@gmail.com',
  firstName: 'Nolan',
  lastName: 'Saris',
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
  id: 1,
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

const MOCKED_ARTICLES: ArticleType[] = Array.from({ length: 3 })
  .fill(MOCKED_ARTICLE)
  .map((article, index) => ({ ...(article as ArticleType), id: index }));

const Articles: React.FC = () => {
  const { pathname } = useLocation();
  const activePage = pathname.split('/').pop();

  const handleShowFeed = useCallback(() => {}, []);

  const handleShowMyArticles = useCallback(() => {}, []);

  useEffect(() => {
    if (activePage === AppRoute.FEED) {
      return handleShowFeed();
    }

    if (activePage === AppRoute.MY_ARTICLES) {
      return handleShowMyArticles();
    }
  }, [handleShowFeed, handleShowMyArticles, activePage]);

  const renderArticles = MOCKED_ARTICLES.map((article) => (
    <ArticleCard key={article.id} article={article} user={MOCKED_USER} />
  ));

  return (
    <div className={styles.wrapper}>
      <div className={styles.buttonsWrapper}>
        <Link to={AppRoute.FEED}>
          <Button
            label="Feed"
            onClick={handleShowFeed}
            className={getValidClassNames(
              styles.button,
              activePage === AppRoute.FEED && styles.activeButton,
            )}
          />
        </Link>
        <Link to={AppRoute.MY_ARTICLES}>
          <Button
            label="My articles"
            onClick={handleShowMyArticles}
            className={getValidClassNames(
              styles.button,
              activePage === AppRoute.MY_ARTICLES && styles.activeButton,
            )}
          />
        </Link>
      </div>
      <div className={styles.articles}>{renderArticles}</div>
    </div>
  );
};

export { Articles };
