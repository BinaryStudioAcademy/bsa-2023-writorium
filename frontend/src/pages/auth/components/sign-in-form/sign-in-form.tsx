import helloImg from '~/assets/img/hello.png';
import hidePasswordIcon from '~/assets/img/hidePassword.svg';
import showPasswordIcon from '~/assets/img/showPassword.svg';
import { Button, Input, Link, Message } from '~/libs/components/components.js';
import { useAppForm, useCallback, useState } from '~/libs/hooks/hooks.js';
import {
  type UserAuthRequestDto,
  userSignInValidationSchema,
} from '~/packages/users/users.js';
import { DEFAULT_LOGIN_PAYLOAD } from '~/pages/auth/components/sign-in-form/libs/common/constants.js';
import styles from '~/pages/auth/components/sign-in-form/styles.module.scss';

type Properties = {
  onSubmit: (payload: UserAuthRequestDto) => void;
};

const SignInForm: React.FC<Properties> = ({ onSubmit }) => {
  const { control, errors, handleSubmit } = useAppForm({
    defaultValues: DEFAULT_LOGIN_PAYLOAD,
    validationSchema: userSignInValidationSchema
  });
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = useCallback((): void => {
    setPasswordVisibility(!isPasswordVisible);
  }, [isPasswordVisible]);

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(onSubmit)(event_);
    },
    [handleSubmit, onSubmit],
  );

  return (
    <>
      <div className={styles.wrapper}>
        <img
          className={styles.helloImg}
          src={helloImg}
          alt='hello' />
        <form
          className={styles.form}
          name="loginForm"
          onSubmit={handleFormSubmit}
        >
          <fieldset
            className={styles.fieldset}>
            <Input
              name='email'
              type='email'
              placeholder='Enter your name'
              label='Email'
              control={control}
              errors={errors}
            />
            <div className={styles.passwordInputWrapper}>
              <button
                type='button'
                className={styles.passwordToggle}
                onClick={togglePasswordVisibility}
              >
                <img
                  className={styles.passwordIcon}
                  src={isPasswordVisible ? showPasswordIcon : hidePasswordIcon}
                  alt={isPasswordVisible ? 'hide-password-icon' : 'show-password-icon'}
                />
              </button>
              <Input
                name='password'
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;'
                label='Password'
                control={control}
                errors={errors}
              />
            </div>
          </fieldset>
          <Button
            className={styles.submitBtn}
            type='submit'
            label='Sign In'
          />
        </form>
        <Message>
          <span className={styles.message}>No account?</span>
          <Link className={styles.link} to={'/sign-up'}>Sign Up</Link>
        </Message>
      </div>
    </>
  );
};

export { SignInForm };
