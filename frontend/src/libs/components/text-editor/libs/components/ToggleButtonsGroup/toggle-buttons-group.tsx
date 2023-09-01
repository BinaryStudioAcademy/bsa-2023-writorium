import { ToggleButton } from './libs/components/ToggleButton/toggle-button.js';
import styles from './styles.module.scss';

type Properties = {
  children: React.ReactNode;
};

const ToggleButtonsGroup = ({ children }: Properties): React.ReactNode => {
  return <div className={styles.buttonsGroup}>{children}</div>;
};

ToggleButtonsGroup.Button = ToggleButton;

export { ToggleButtonsGroup };
export { type ToggleButtonProperties } from './libs/components/ToggleButton/toggle-button.js';
