import '~/assets/css/styles.scss';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import {
  App,
  ProtectedRoute,
  PublicRoute,
  RouterProvider,
  StoreProvider,
  Tooltip,
} from '~/libs/components/components.js';
import {
  AppRoute,
  ArticleSubRoute,
  DataTooltipId,
} from '~/libs/enums/enums.js';
import { store } from '~/libs/packages/store/store.js';
import {
  ArticlePage,
  CreateArticlePage,
  SharedArticlePage,
} from '~/pages/article/article.js';
import { Auth } from '~/pages/auth/auth.js';
import { Landing } from '~/pages/landing/landing.js';
import { ProfilePage } from '~/pages/profile/profile-page.js';

import {
  ArticlesFeed,
  ArticlesPage,
  MyArticles,
} from './pages/articles/articles.js';

createRoot(document.querySelector('#root') as HTMLElement).render(
  <StrictMode>
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID as string}
    >
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
                      <ProfilePage />
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
                      index: true,
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
                      <ArticlePage />
                    </ProtectedRoute>
                  ),
                },
                {
                  path: AppRoute.SHARED,
                  element: (
                    <PublicRoute>
                      <SharedArticlePage />
                    </PublicRoute>
                  ),
                },
                {
                  path: AppRoute.CREATE_ARTICLE,
                  element: (
                    <ProtectedRoute>
                      <CreateArticlePage />
                    </ProtectedRoute>
                  ),
                },
                {
                  path: AppRoute.FORGOT_PASSWORD,
                  element: (
                    <PublicRoute>
                      <Auth />
                    </PublicRoute>
                  ),
                },
                {
                  path: AppRoute.RESET_PASSWORD,
                  element: (
                    <PublicRoute>
                      <Auth />
                    </PublicRoute>
                  ),
                },
              ],
            },
          ]}
        />
      </StoreProvider>
    </GoogleOAuthProvider>
    <Tooltip id={DataTooltipId.MAIN_TOOLTIP} />
  </StrictMode>,
);
