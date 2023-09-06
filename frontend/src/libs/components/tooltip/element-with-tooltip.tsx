import {
  createElement,
  type FC,
  type ReactElement,
  type ReactHTML,
  type ReactNode,
} from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { type ValueOf } from 'shared/build/index.js';

import { DataTooltipId } from '~/libs/enums/enums.js';

type ElementWithTooltipProperties = {
  className?: string;
  elementType: keyof ReactHTML;
  placement?: 'bottom' | 'top' | 'left' | 'right';
  tooltipId?: ValueOf<typeof DataTooltipId>;
  tooltipContent: string | ReactElement;
  children?: ReactNode;
};

const ElementWithTooltip: FC<ElementWithTooltipProperties> = ({
  children,
  className,
  elementType,
  placement = 'top',
  tooltipId = DataTooltipId.MAIN_TOOLTIP,
  tooltipContent,
}) => {
  const isStringContent = typeof tooltipContent === 'string';
  const contentDataAttribute = isStringContent
    ? 'data-tooltip-content'
    : 'data-tooltip-html';
  const adaptedTooltipContent = isStringContent
    ? tooltipContent
    : renderToStaticMarkup(tooltipContent);

  return createElement(
    elementType,
    {
      'data-tooltip-id': tooltipId,
      'data-tooltip-place': placement,
      className,
      [contentDataAttribute]: adaptedTooltipContent,
    },
    children,
  );
};

export { ElementWithTooltip, type ElementWithTooltipProperties };
