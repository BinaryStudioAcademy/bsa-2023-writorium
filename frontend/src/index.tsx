import '~/assets/css/styles.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import {
  App,
  ProtectedRoute,
  PublicRoute,
  RouterProvider,
  StoreProvider,
} from '~/libs/components/components.js';
import { AppRoute, ArticleSubRoute } from '~/libs/enums/enums.js';
import { store } from '~/libs/packages/store/store.js';
import { Article } from '~/pages/article/article.js';
import { Auth } from '~/pages/auth/auth.js';
import { Landing } from '~/pages/landing/landing.js';
import { Profile } from '~/pages/profile/profile.js';

import {
  ArticlesFeed,
  ArticlesPage,
  MyArticles,
} from './pages/articles/articles.js';

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
                element: (
                  <PublicRoute>
                    <Landing />
                  </PublicRoute>
                ),
              },
              {
                path: AppRoute.SIGN_IN,
                element: (
                  <PublicRoute>
                    <Auth />
                  </PublicRoute>
                ),
              },
              {
                path: AppRoute.SIGN_UP,
                element: (
                  <PublicRoute>
                    <Auth />
                  </PublicRoute>
                ),
              },
              {
                path: AppRoute.PROFILE,
                element: (
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                ),
              },
              {
                path: AppRoute.ARTICLES,
                element: (
                  <ProtectedRoute>
                    <ArticlesPage />
                  </ProtectedRoute>
                ),
                children: [
                  {
                    path: ArticleSubRoute.FEED,
                    element: <ArticlesFeed />,
                  },
                  {
                    path: ArticleSubRoute.MY_ARTICLES,
                    element: <MyArticles />,
                  },
                ],
              },
              {
                path: AppRoute.ARTICLE,
                element: (
                  <ProtectedRoute>
                    <Article />
                  </ProtectedRoute>
                ),
              },
            ],
          },
        ]}
      />
    </StoreProvider>
  </StrictMode>,
);
