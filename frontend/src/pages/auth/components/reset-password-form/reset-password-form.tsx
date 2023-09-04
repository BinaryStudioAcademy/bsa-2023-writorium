import { Input, Link, Notification } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/app-route.enum';
import { useAppForm, useCallback, useParams } from '~/libs/hooks/hooks.js';
import { type AuthResetPasswordDto } from '~/packages/auth/auth.js';
import { resetPasswordValidationSchema } from '~/packages/auth/auth.js';

import { AuthSubmitButton } from '../auth-submit-button/auth-submit-button.js';
import { DEFAULT_PAYLOAD } from './libs/constants/constants.js';
import styles from './styles.module.scss';

type Properties = {
  onSubmit: (payload: AuthResetPasswordDto) => void;
};

const ResetPasswordForm: React.FC<Properties> = ({ onSubmit }) => {
  const { token } = useParams();

  const { control, errors, handleSubmit } = useAppForm({
    defaultValues: {
      ...DEFAULT_PAYLOAD,
      resetPasswordToken: token ?? '',
    },
    validationSchema: resetPasswordValidationSchema,
  });

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(onSubmit)(event_);
    },
    [handleSubmit, onSubmit],
  );

  return (
    <>
      <Notification />
      <div className={styles.formWrapper}>
        <h2 className={styles.authFormTitle}>Reset your password</h2>
        <form
          className={styles.form}
          name="loginForm"
          onSubmit={handleFormSubmit}
        >
          <fieldset className={styles.fieldset}>
            <Input
              name="password"
              type="password"
              placeholder="Enter new password"
              label="Password"
              control={control}
              errors={errors}
            />
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              label="Confirm password"
              control={control}
              errors={errors}
            />
          </fieldset>
          <AuthSubmitButton label="Submit" />
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

export { ResetPasswordForm };
