import { getValidClassNames } from '~/libs/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
  error: string;
  className?: string;
};

const ErrorMessage: React.FC<Properties> = ({ error, className }) => {
  const hasError = Boolean(error);

  return (
    <span className={getValidClassNames(styles.errorMessage, className)}>
      {hasError && error}
    </span>
  );
};

export { ErrorMessage };
