import { getValidClassNames } from '~/libs/helpers/helpers.js';

import { ToggleButton } from './libs/components/ToggleButton/toggle-button.js';
import styles from './styles.module.scss';

type Properties = {
  children: React.ReactNode;
  className?: string;
};

const ToggleButtonsGroup = ({
  children,
  className,
}: Properties): React.ReactNode => {
  return (
    <div className={getValidClassNames(styles.buttonsGroup, className)}>
      {children}
    </div>
  );
};

ToggleButtonsGroup.Button = ToggleButton;

export { ToggleButtonsGroup };
export { type ToggleButtonProperties } from './libs/components/ToggleButton/toggle-button.js';
