import { EventKey } from '~/libs/enums/enums.js';
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
  classNameContentWrapper?: string;
  content: React.ReactNode;
  children: React.ReactNode;
  closeOnChildrenClick?: boolean;
};

const Popover: React.FC<Properties> = ({
  className,
  classNameContentWrapper,
  content,
  children,
  closeOnChildrenClick,
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
      className={getValidClassNames(styles.popoverWrapper, className)}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      ref={popupReference}
      {...(!closeOnChildrenClick && { onClick: handleClick })}
    >
      <div {...(closeOnChildrenClick && { onClick: handleClick })}>
        {children}
      </div>
      {isOpen && (
        <div
          className={getValidClassNames(
            styles.popoverContentWrapper,
            classNameContentWrapper,
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export { Popover };
