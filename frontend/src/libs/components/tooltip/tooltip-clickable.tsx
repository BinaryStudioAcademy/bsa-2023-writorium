import { type FC } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import { type DataTooltipId } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { type ValueOf } from '~/libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  id: ValueOf<typeof DataTooltipId>;
  anchorSelect: string;
  shouldHideArrow?: boolean;
  className?: string;
  offset?: number;
  children?: React.ReactNode;
  openOnClick?: boolean;
  clickable?: boolean;
  closeOnEsc?: boolean;
  closeOnScroll?: boolean;
};

const TooltipClickable: FC<Properties> = ({
  id,
  shouldHideArrow,
  className,
  offset,
  children,
  anchorSelect,
  openOnClick = true,
  clickable = true,
  closeOnEsc = true,
  closeOnScroll = true,
}) => (
  <ReactTooltip
    id={id}
    anchorSelect={anchorSelect}
    noArrow={shouldHideArrow}
    className={getValidClassNames(className, styles.tooltip)}
    offset={offset}
    openOnClick={openOnClick}
    clickable={clickable}
    closeOnEsc={closeOnEsc}
    closeOnScroll={closeOnScroll}
  >
    {children}
  </ReactTooltip>
);

export { TooltipClickable };
