import 'react-tooltip/dist/react-tooltip.css';

import { type FC } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import { type TooltipPosition } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useEffect, useRef } from '~/libs/hooks/hooks.js';
import { type ValueOf } from '~/libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  id: string;
  isOpen?: boolean;
  onClose?: () => void;
  shouldHideArrow?: boolean;
  className?: string;
  offset?: number;
  openOnClick?: boolean;
  clickable?: boolean;
  place?: ValueOf<typeof TooltipPosition>;
  children?: React.ReactNode;
  anchorElement?: React.ReactNode;
  isScrollable?: boolean;
};

const TooltipWrapper: FC<Properties> = ({
  id,
  shouldHideArrow,
  className,
  offset,
  openOnClick,
  clickable,
  isOpen,
  place,
  children,
  anchorElement,
  onClose,
  isScrollable,
}) => {
  const tooltipReference = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent): void => {
      if (
        tooltipReference.current &&
        !tooltipReference.current.contains(event.target as Node)
      ) {
        onClose && onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen && !isScrollable) {
      document.body.classList.add(styles.noOverflow);
    }

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.body.classList.remove(styles.noOverflow);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, isScrollable, handleClickOutside]);

  return (
    <>
      {anchorElement && (
        <div data-tooltip-id={id} ref={tooltipReference}>
          {anchorElement}
        </div>
      )}
      <ReactTooltip
        id={id}
        noArrow={shouldHideArrow}
        className={getValidClassNames(className, styles.tooltip)}
        offset={offset}
        openOnClick={openOnClick}
        clickable={clickable}
        isOpen={isOpen}
        place={place}
      >
        {children}
      </ReactTooltip>
    </>
  );
};

export { TooltipWrapper };
