import { Icon } from '~/libs/components/components.js';
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
    <button
      type="button"
      onClick={onClick}
      className={getValidClassNames(styles.button, isActive && styles.active)}
    >
      <Icon iconName={icon} />
    </button>
  );
};

export { ToggleButton };
export { type Properties as ToggleButtonProperties };
