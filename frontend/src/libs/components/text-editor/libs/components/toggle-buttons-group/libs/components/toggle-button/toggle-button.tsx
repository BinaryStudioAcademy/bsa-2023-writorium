import { IconButton } from '~/libs/components/components.js';
import { type IconName } from '~/libs/components/icon/common.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
  icon: IconName;
  onClick?: () => void;
  isActive?: boolean;
};

const ToggleButton: React.FC<Properties> = ({
  icon,
  onClick,
  isActive = false,
}): React.ReactNode => {
  return (
    <IconButton
      iconName={icon}
      onClick={onClick}
      className={getValidClassNames(styles.button, isActive && styles.active)}
    />
  );
};

export { ToggleButton };
export { type Properties as ToggleButtonProperties };
