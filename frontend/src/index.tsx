import '~/assets/css/styles.scss';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import {
  App,
  ProtectedRoute,
  PublicRoute,
  RouterProvider,
  SharedArticleRoute,
  StoreProvider,
  Tooltip,
} from '~/libs/components/components.js';
import { AppRoute, DataTooltipId } from '~/libs/enums/enums.js';
import { config } from '~/libs/packages/config/config.js';
import { store } from '~/libs/packages/store/store.js';
import {
  ArticlePage,
  CreateArticlePage,
  EditArticlePage,
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
    <GoogleOAuthProvider clientId={config.ENV.GOOGLE.CLIENT_ID}>
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
                      path: AppRoute.ARTICLES_MY_ARTICLES,
                      element: <MyArticles />,
                    },
                  ],
                },
                {
                  path: AppRoute.ARTICLES_$ID,
                  element: (
                    <ProtectedRoute>
                      <ArticlePage />
                    </ProtectedRoute>
                  ),
                },
                {
                  path: AppRoute.ARTICLES_SHARED_$TOKEN,
                  element: (
                    <SharedArticleRoute>
                      <SharedArticlePage />
                    </SharedArticleRoute>
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
                  path: AppRoute.ARTICLES_EDIT_$ID,
                  element: (
                    <ProtectedRoute>
                      <EditArticlePage />
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
                  path: AppRoute.RESET_PASSWORD_$TOKEN,
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
