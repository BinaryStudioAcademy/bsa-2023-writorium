import { useCallback } from 'react';

import { IconButton } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';

import { type ToolbarButtonProperties } from '../../types/types.js';
import styles from './styles.module.scss';

type Properties<T extends string | number> = {
  className?: string;
  buttons: ToolbarButtonProperties<T>[];
  onButtonClick: (key: T) => void;
  isButtonActive: (key: T) => boolean;
};

const ToggleButtonsGroup = <T extends string | number>({
  buttons = [],
  className,
  isButtonActive,
  onButtonClick,
}: Properties<T>): React.ReactNode => {
  const handleButtonClick = useCallback(
    (key: T) => () => {
      onButtonClick(key);
    },
    [onButtonClick],
  );

  return (
    <div className={getValidClassNames(styles.buttonsGroup, className)}>
      {buttons.map(({ iconName, key }) => {
        return (
          <IconButton
            key={key}
            iconName={iconName}
            className={getValidClassNames(
              styles.button,
              isButtonActive(key) && styles.buttonActive,
            )}
            onClick={handleButtonClick(key)}
          />
        );
      })}
    </div>
  );
};

export { ToggleButtonsGroup };
