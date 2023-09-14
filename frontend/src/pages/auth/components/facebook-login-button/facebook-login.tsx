import { FacebookProvider } from 'react-facebook';

import { config } from '~/libs/packages/config/config.js';
import { type UserSignInWithFacebookResponseDto } from '~/packages/auth/auth.js';

import { FacebookLoginButton } from '../components.js';

type FacebookLoginProperties = {
  onLogin: (response: UserSignInWithFacebookResponseDto) => void;
};

const FacebookLogin: React.FC<FacebookLoginProperties> = ({ onLogin }) => {
  return (
    <FacebookProvider appId={config.ENV.FACEBOOK.APP_ID}>
      <FacebookLoginButton onLogin={onLogin} />
    </FacebookProvider>
  );
};

export { FacebookLogin };
