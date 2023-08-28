import '~/assets/css/styles.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import {
  App,
  RouterProvider,
  StoreProvider,
} from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { store } from '~/libs/packages/store/store.js';
import { type UserAuthResponseDto } from '~/packages/users/users.js';
import { Auth } from '~/pages/auth/auth.js';
import { Landing } from '~/pages/landing/landing.js';
import { Profile } from '~/pages/profile/profile.js';

import { Articles } from './pages/articles/articles.js';
import {
  type ArticleType,
  type TagType,
} from './pages/articles/libs/types/types.js';

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

createRoot(document.querySelector('#root') as HTMLElement).render(
  <StrictMode>
    <StoreProvider store={store.instance}>
      <RouterProvider
        routes={[
          {
            path: AppRoute.ROOT,
            element: <App />,
            children: [
              {
                path: AppRoute.ROOT,
                element: <Landing />,
              },
              {
                path: AppRoute.SIGN_IN,
                element: <Auth />,
              },
              {
                path: AppRoute.SIGN_UP,
                element: <Auth />,
              },
              {
                path: AppRoute.PROFILE,
                element: <Profile />,
              },
              {
                path: AppRoute.ARTICLES,
                element: (
                  <Articles articles={MOCKED_ARTICLES} user={MOCKED_USER} />
                ),
              },
            ],
          },
        ]}
      />
    </StoreProvider>
  </StrictMode>,
);
