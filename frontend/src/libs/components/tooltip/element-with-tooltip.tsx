import {
  createElement,
  type FC,
  type ReactElement,
  type ReactHTML,
  type ReactNode,
} from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { DataTooltipId, TooltipPosition } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

type ElementWithTooltipProperties = {
  className?: string;
  elementType: keyof ReactHTML;
  placement?: ValueOf<typeof TooltipPosition>;
  tooltipId?: ValueOf<typeof DataTooltipId>;
  tooltipContent: string | ReactElement;
  children?: ReactNode;
};

const ElementWithTooltip: FC<ElementWithTooltipProperties> = ({
  children,
  className,
  elementType,
  placement = TooltipPosition.TOP,
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
