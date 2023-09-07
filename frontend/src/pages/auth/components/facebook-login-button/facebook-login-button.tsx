import {
  type ReactFacebookFailureResponse,
  type ReactFacebookLoginInfo,
} from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login';

import { useCallback } from '~/libs/hooks/hooks.js';
import { config } from '~/libs/packages/config/config.js';
import { type UserSignInWithFacebookResponseDto } from '~/packages/auth/auth.js';
import { notification } from '~/packages/notification/notification.js';

import styles from './styles.module.scss';

type FacebookLoginButtonProperties = {
  onLogin: (response: UserSignInWithFacebookResponseDto) => void;
};

const FacebookLoginButton: React.FC<FacebookLoginButtonProperties> = ({
  onLogin,
}) => {
  const responseFacebook = useCallback(
    (response: ReactFacebookLoginInfo | ReactFacebookFailureResponse): void => {
      if ('accessToken' in response) {
        const { accessToken, email, name } = response;
        onLogin({
          accessToken,
          email,
          name,
        });
      } else {
        notification.error('Facebook sign in failed');
      }
    },
    [onLogin],
  );

  return (
    <FacebookLogin
      appId={config.ENV.FACEBOOK.APP_ID}
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
      textButton="Sign in with Facebook"
      cssClass={styles.facebookLoginButton}
    />
  );
};

export { FacebookLoginButton };
