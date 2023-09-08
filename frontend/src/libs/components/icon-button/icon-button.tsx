import { ButtonType } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';

import { type IconName } from '../icon/common.js';
import { Icon } from '../icon/icon.jsx';
import styles from './styles.module.scss';

type Properties = {
  iconName: IconName;
  onClick?: () => void;
  label?: string;
  className?: string;
  iconClassName?: string;
};

const IconButton: React.FC<Properties> = ({
  iconName,
  onClick,
  label = '',
  className = '',
  iconClassName = '',
}) => (
  <button
    className={getValidClassNames(styles.iconButton, className)}
    type={ButtonType.BUTTON}
    onClick={onClick}
  >
    <Icon iconName={iconName} className={iconClassName} />
    {label}
  </button>
);

export { IconButton };
