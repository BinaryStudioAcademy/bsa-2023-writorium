import helloImg from '~/assets/img/hello.png';
import hidePasswordIcon from '~/assets/img/hidePassword.svg';
import showPasswordIcon from '~/assets/img/showPassword.svg';
import { Button, Input, Link } from '~/libs/components/components.js';
import { useAppForm, useCallback,useState } from '~/libs/hooks/hooks.js';

import { DEFAULT_LOGIN_PAYLOAD } from './libs/common/constants.js';
import styles from './styles.module.scss';

type Properties = {
  onSubmit: () => void;
};

const SignInForm: React.FC<Properties> = () => {
  const { control, errors } = useAppForm({
    defaultValues: DEFAULT_LOGIN_PAYLOAD,
    /**
     * @todo implement sign in validation
     */
    // validationSchema: ''
  });
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = useCallback((): void => setPasswordVisibility(!isPasswordVisible),
    [isPasswordVisible]);

  const handleKeyPress = useCallback((event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === ' ') {
      togglePasswordVisibility();
    }
  }, [togglePasswordVisibility]);

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
        >
          <fieldset className={`${styles.loginBlock} ${styles.socialButtons}`}>
            <Button
              className={`${styles.button} ${styles.socialButton}`}
              label='Sign in with Google'
            />
            <Button
              className={`${styles.button} ${styles.socialButton}`}
              label='Sign in with Facebook'
            />
          </fieldset>
          <h5 className={styles.divider}>or</h5>
          <fieldset className={`${styles.loginBlock} ${styles.userInputs}`}>
            <Input
              className={styles.input}
              classNameLabel={styles.label}
              name='email'
              type='email'
              placeholder='Enter your name'
              label='Email'
              control={control}
              errors={errors}
            />
            <div className={styles.passwordInput}>
              <Link
                className={styles.resetPassword}
                /* 
                  Where redirect to when Forget Password clicked?
                */
                to='/sign-up'
              >
                Forget Password
              </Link>
              <button
                className={styles.passwordToggleButton}
                onClick={togglePasswordVisibility}
                onKeyDown={handleKeyPress}
              >
                <img
                  className={styles.passwordIcon}
                  src={isPasswordVisible ? showPasswordIcon : hidePasswordIcon}
                  alt={isPasswordVisible ? 'hide-password-icon' : 'show-password-icon'}
                />
              </button>
              <Input
                className={styles.input}
                classNameLabel={styles.label}
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
            className={`${styles.button} ${styles.submitButton}`}
            type='submit'
            label='Sign In'
          />
        </form>
      </div>
    </>
  );
};

export { SignInForm };
