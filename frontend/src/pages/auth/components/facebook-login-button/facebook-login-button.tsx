import { type ReactFacebookLoginInfo } from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login';

import { useCallback } from '~/libs/hooks/hooks.js';

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
      appId="1342855219997182"
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
      icon="fa-facebook"
      textButton="Login with Facebook"
    />
  );
};

export { FacebookLoginButton };
