import { getValidClassNames } from '~/libs/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
  error: string;
  className?: string;
};

const ErrorMessage: React.FC<Properties> = ({ error, className }) => {
  return (
    <div className={getValidClassNames(styles.errorMessage, className)}>
      {error}
    </div>
  );
};

export { ErrorMessage };