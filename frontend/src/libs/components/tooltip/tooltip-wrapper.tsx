import 'react-tooltip/dist/react-tooltip.css';

import { type FC } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import { type DataTooltipId } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { type ValueOf } from '~/libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  id: ValueOf<typeof DataTooltipId>;
  shouldHideArrow?: boolean;
  className?: string;
  offset?: number;
};

const TooltipWrapper: FC<Properties> = ({
  id,
  shouldHideArrow,
  className,
  offset,
}) => (
  <ReactTooltip
    id={id}
    noArrow={shouldHideArrow}
    className={getValidClassNames(className, styles.tooltip)}
    offset={offset}
  />
);

export { TooltipWrapper };
