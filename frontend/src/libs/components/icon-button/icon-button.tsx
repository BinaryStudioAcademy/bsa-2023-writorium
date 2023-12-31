import { Icon } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { type ReactMouseEvent } from '~/libs/types/types.js';

import { type IconName } from '../icon/common.js';
import styles from './styles.module.scss';

type Properties = {
  iconName: IconName;
  onClick?:
    | (() => void)
    | ((event: ReactMouseEvent<HTMLButtonElement>) => void);
  label?: string;
  className?: string;
  iconClassName?: string;
  isLoading?: boolean;
};

const IconButton: React.FC<Properties> = ({
  iconName,
  onClick,
  label = '',
  className = '',
  iconClassName = '',
  isLoading,
}) => (
  <button
    className={getValidClassNames(styles.iconButton, className)}
    type="button"
    onClick={onClick}
    disabled={isLoading}
  >
    <Icon iconName={iconName} className={iconClassName} />
    {label}
  </button>
);

export { IconButton };
