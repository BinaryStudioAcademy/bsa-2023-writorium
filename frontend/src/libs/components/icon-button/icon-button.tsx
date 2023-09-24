import { Icon } from '~/libs/components/components.js';
import { EMPTY_STRING } from '~/libs/constants/constants.js';
import { ButtonType } from '~/libs/enums/enums.js';
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
  label = EMPTY_STRING,
  className = EMPTY_STRING,
  iconClassName = EMPTY_STRING,
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
