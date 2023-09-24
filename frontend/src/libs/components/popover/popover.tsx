import { ButtonType, EventKey } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useCallback,
  useHandleClickOutside,
  useReference,
  useState,
} from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties = {
  className?: string;
  content: React.ReactNode;
  children: React.ReactNode;
};

const Popover: React.FC<Properties> = ({
  className,
  content,
  children,
}: Properties): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const popupReference = useReference<HTMLDivElement>(null);

  const handleClick = useCallback((): void => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleClose = (): void => {
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === EventKey.ESCAPE) {
      handleClose();
    }
  };

  useHandleClickOutside({
    ref: popupReference,
    onClick: handleClose,
  });

  return (
    <div
      className={styles.popoverWrapper}
      role={ButtonType.BUTTON}
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      ref={popupReference}
    >
      {children}
      {isOpen && (
        <div
          className={getValidClassNames(
            styles.popoverContentWrapper,
            className,
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export { Popover };
