import { type ReactFacebookLoginInfo } from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login';

import { useCallback } from '~/libs/hooks/hooks.js';
import { config } from '~/libs/packages/config/config.js';

import styles from './styles.module.scss';

type FacebookLoginButtonProperties = {
  onLogin: (response: ReactFacebookLoginInfo) => void;
};

const FacebookLoginButton: React.FC<FacebookLoginButtonProperties> = ({
  onLogin,
}) => {
  const responseFacebook = useCallback(
    (response: ReactFacebookLoginInfo): void => {
      if (response.accessToken) {
        onLogin(response);
      } else {
        new Error('Facebook login failed.');
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
