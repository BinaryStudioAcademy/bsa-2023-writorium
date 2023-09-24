import { type ButtonProperties } from '~/libs/components/button/button.js';
import { Button } from '~/libs/components/components.js';
import { ButtonType } from '~/libs/enums/enums.js';

import styles from './styles.module.scss';

type Properties = Pick<ButtonProperties, 'label' | 'isDisabled' | 'onClick'>;

const AuthSignInButton: React.FC<Properties> = ({
  label,
  isDisabled,
  onClick,
}) => {
  return (
    <Button
      label={label}
      isDisabled={isDisabled}
      onClick={onClick}
      className={styles.authSignInButton}
      type={ButtonType.BUTTON}
    />
  );
};

export { AuthSignInButton };
