import { LoginStatus, useFacebook } from 'react-facebook';

import { Button } from '~/libs/components/components.js';
import { useCallback } from '~/libs/hooks/hooks.js';
import { type UserSignInWithFacebookResponseDto } from '~/packages/auth/auth.js';
import { notification } from '~/packages/notification/notification.js';

type FacebookLoginButtonProperties = {
  onLogin: (response: UserSignInWithFacebookResponseDto) => void;
};

type ProfileResponse = {
  email: string;
  id: string;
};

const FACEBOOK_ERROR_MESSAGE = 'Facebook sign in failed';

const FacebookLoginButton: React.FC<FacebookLoginButtonProperties> = ({
  onLogin,
}) => {
  const { init, isLoading } = useFacebook();

  const handleFacebookLogin = useCallback(async (): Promise<void> => {
    try {
      const api = await init();

      if (!api) {
        throw new Error(FACEBOOK_ERROR_MESSAGE);
      }

      const response = await api.login({ scope: 'email' });

      if (response.status !== LoginStatus.CONNECTED) {
        throw new Error(FACEBOOK_ERROR_MESSAGE);
      }

      const profile = (await api.getProfile({
        fields: ['email'],
      })) as ProfileResponse | undefined;

      if (!profile?.email) {
        throw new Error(FACEBOOK_ERROR_MESSAGE);
      }

      onLogin({
        accessToken: response.authResponse.accessToken,
        email: profile.email,
      });
    } catch (error) {
      if (error instanceof Error) {
        notification.error(error.message);
      }
    }
  }, [onLogin, init]);

  return (
    <Button
      type="button"
      variant="outlined"
      label="Sign in with Facebook"
      name="Sign in with Facebook"
      isDisabled={isLoading}
      onClick={handleFacebookLogin}
    />
  );
};

export { FacebookLoginButton };
