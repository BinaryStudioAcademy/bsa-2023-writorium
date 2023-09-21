import { ButtonType } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';

import { type IconName } from '../icon/common.js';
import { Icon } from '../icon/icon.jsx';
import styles from './styles.module.scss';

type Properties = {
  iconName: IconName;
  onClick?:
    | (() => void)
    | ((event: React.MouseEvent<HTMLButtonElement>) => void);
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
    type={ButtonType.BUTTON}
    onClick={onClick}
    disabled={isLoading}
  >
    <Icon iconName={iconName} className={iconClassName} />
    {label}
  </button>
);

export { IconButton };
