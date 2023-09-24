import { type ButtonProperties } from '~/libs/components/button/button.js';
import { Button } from '~/libs/components/components.js';
import { ButtonType } from '~/libs/enums/enums.js';

import styles from './styles.module.scss';

type Properties = Pick<ButtonProperties, 'label' | 'disabled'>;

const AuthSubmitButton: React.FC<Properties> = (properties) => {
  return (
    <Button
      {...properties}
      hasFullWidth
      className={styles.authSubmitButton}
      type={ButtonType.SUBMIT}
    />
  );
};

export { AuthSubmitButton };
