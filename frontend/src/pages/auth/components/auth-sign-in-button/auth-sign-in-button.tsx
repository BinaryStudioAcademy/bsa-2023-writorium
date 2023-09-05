import { type ButtonProperties } from '~/libs/components/button/button.js';
import { Button } from '~/libs/components/components.js';

import styles from './styles.module.scss';

type Properties = Pick<ButtonProperties, 'label' | 'disabled' | 'onClick'>;

const AuthSignInButton: React.FC<Properties> = ({
  label,
  disabled,
  onClick,
}) => {
  return (
    <Button
      label={label}
      disabled={disabled}
      onClick={onClick}
      className={styles.authSignInButton}
      type="submit"
    />
  );
};

export { AuthSignInButton };
