import { type ButtonProperties } from '~/libs/components/button/button.js';
import { Button } from '~/libs/components/components.js';

import styles from './styles.module.scss';

type Properties = Pick<ButtonProperties, 'label'>;

const AuthSubmitButton: React.FC<Properties> = ({ label }) => {
  return (
    <Button className={styles.authSubmitButton} type="submit" label={label} />
  );
};

export { AuthSubmitButton };
