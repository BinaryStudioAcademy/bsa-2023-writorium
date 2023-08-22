import helloImg from '~/assets/img/hello.png';
import hidePasswordIcon from '~/assets/img/hidePassword.svg';
import showPasswordIcon from '~/assets/img/showPassword.svg';
import { Button, Input } from '~/libs/components/components.js';
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

  const togglePasswordVisibility = useCallback((): void => {
    setPasswordVisibility(!isPasswordVisible);
  }, [isPasswordVisible]);

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
          <fieldset
            className={styles.fieldset}>
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
            className={styles.submitBtn}
            type='submit'
            label='Sign In'
          />
        </form>
      </div>
    </>
  );
};

export { SignInForm };
