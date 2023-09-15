import 'react-tooltip/dist/react-tooltip.css';

import { type FC } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import { type TooltipPosition } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { type ValueOf } from '~/libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  id: string;
  shouldHideArrow?: boolean;
  className?: string;
  offset?: number;
  openOnClick?: boolean;
  clickable?: boolean;
  isOpen?: boolean;
  place?: ValueOf<typeof TooltipPosition>;
  children?: React.ReactNode;
  anchorElement?: React.ReactNode;
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
}) => {
  return (
    <>
      <div data-tooltip-id={id}>{anchorElement}</div>
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
