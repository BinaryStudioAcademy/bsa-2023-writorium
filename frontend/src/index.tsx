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
import { AppRoute } from '~/libs/enums/enums.js';
import { store } from '~/libs/packages/store/store.js';
import { Article } from '~/pages/article/article.js';
import { Auth } from '~/pages/auth/auth.js';
import { Landing } from '~/pages/landing/landing.js';
import { Profile } from '~/pages/profile/profile.js';

import { Articles } from './pages/articles/articles.js';

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
                  <ProtectedRoute>
                    <Landing />
                  </ProtectedRoute>
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
                element: <Profile />,
              },
              {
                path: AppRoute.ARTICLES,
                element: (
                  <ProtectedRoute>
                    <Articles />
                  </ProtectedRoute>
                ),
                children: [
                  {
                    path: AppRoute.FEED,
                  },
                  {
                    path: AppRoute.MY_ARTICLES,
                  },
                ],
              },
              {
                path: AppRoute.ARTICLE,
                element: <Article />,
              },
            ],
          },
        ]}
      />
    </StoreProvider>
  </StrictMode>,
);
