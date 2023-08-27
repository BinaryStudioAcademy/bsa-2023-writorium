import { Input, Link } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/app-route.enum.js';
import { useAppForm, useCallback } from '~/libs/hooks/hooks.js';
import {
  type UserSignUpRequestDto,
  userSignUpValidationSchema,
} from '~/packages/users/users.js';

import { AuthSubmitButton } from '../auth-submit-button/auth-submit-button.js';
import { PasswordInput } from '../password-input/password-input.js';
import { DEFAULT_SIGN_UP_PAYLOAD } from './libs/constants.js';
import styles from './styles.module.scss';

type Properties = {
  onSubmit: (payload: UserSignUpRequestDto) => void;
};

const SignUpForm: React.FC<Properties> = ({ onSubmit }) => {
  const { control, errors, handleSubmit, isValid } =
    useAppForm<UserSignUpRequestDto>({
      mode: 'onTouched',
      defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
      validationSchema: userSignUpValidationSchema,
    });

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(onSubmit)(event_);
    },
    [handleSubmit, onSubmit],
  );

  return (
    <>
      <form
        name="signUpForm"
        className={styles.form}
        onSubmit={handleFormSubmit}
      >
        <fieldset className={styles.fieldset}>
          <Input
            type="text"
            label="Email"
            placeholder="Enter your email"
            name="email"
            control={control}
            errors={errors}
          />
          <Input
            type="text"
            label="First Name"
            placeholder="Enter your first name"
            name="firstName"
            control={control}
            errors={errors}
          />
          <Input
            type="text"
            label="Last Name"
            placeholder="Enter your last name"
            name="lastName"
            control={control}
            errors={errors}
          />
          <PasswordInput
            name="password"
            control={control}
            errors={errors}
            label="Password"
            placeholder="Enter password"
          />
        </fieldset>
        <AuthSubmitButton label="Sign Up" disabled={!isValid} />
      </form>
      <div className={styles.messageWrapper}>
        <span className={styles.message}>Already have an account?</span>
        <Link className={styles.link} to={AppRoute.SIGN_IN}>
          Sign In
        </Link>
      </div>
    </>
  );
};

export { SignUpForm };
