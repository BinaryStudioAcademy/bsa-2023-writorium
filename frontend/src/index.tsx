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
import { Auth } from '~/pages/auth/auth.js';
import { Landing } from '~/pages/landing/landing.js';
import { Profile } from '~/pages/profile/profile.js';

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
            ],
          },
        ]}
      />
    </StoreProvider>
  </StrictMode>,
);
