import { Input, Link } from '~/libs/components/components.js';
import { AppRoute, InputType } from '~/libs/enums/enums.js';
import { useAppForm, useCallback } from '~/libs/hooks/hooks.js';
import {
  type AuthRequestPasswordDto,
  requestPasswordValidationSchema,
} from '~/packages/auth/auth.js';

import { AuthSubmitButton } from '../auth-submit-button/auth-submit-button.js';
import { DEFAULT_PAYLOAD } from './libs/constants/constants.js';
import styles from './styles.module.scss';

type Properties = {
  onSubmit: (payload: AuthRequestPasswordDto) => void;
};

const ForgotPasswordForm: React.FC<Properties> = ({ onSubmit }) => {
  const { control, errors, handleSubmit } = useAppForm({
    defaultValues: DEFAULT_PAYLOAD,
    validationSchema: requestPasswordValidationSchema,
  });
  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(onSubmit)(event_);
    },
    [handleSubmit, onSubmit],
  );

  return (
    <>
      <div className={styles.formWrapper}>
        <h2 className={styles.authFormTitle}>Forgot password?</h2>
        <form
          className={styles.form}
          name="loginForm"
          onSubmit={handleFormSubmit}
        >
          <fieldset className={styles.fieldset}>
            <Input
              name="email"
              type={InputType.EMAIL}
              placeholder="Enter your email"
              label="Email"
              control={control}
              errors={errors}
            />
          </fieldset>
          <AuthSubmitButton label="Send" />
        </form>
      </div>
      <div className={styles.messageWrapper}>
        <span className={styles.message}>No account?</span>
        <Link className={styles.link} to={AppRoute.SIGN_UP}>
          Sign Up
        </Link>
      </div>
    </>
  );
};

export { ForgotPasswordForm };
