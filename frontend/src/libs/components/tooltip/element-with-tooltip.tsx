import {
  createElement,
  type ReactElement,
  type ReactHTML,
  type ReactNode,
} from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import {
  DataTooltipId,
  TooltipPosition,
  TooltipPositionStrategy,
} from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

type ElementWithTooltipProperties = {
  className?: string;
  elementType: keyof ReactHTML;
  placement?: ValueOf<typeof TooltipPosition>;
  tooltipId?: ValueOf<typeof DataTooltipId>;
  tooltipPositionStrategy?: ValueOf<typeof TooltipPositionStrategy>;
  hasToShowTooltip?: boolean;
  tooltipContent: string | ReactElement;
  children?: ReactNode;
};

const ElementWithTooltip: React.FC<ElementWithTooltipProperties> = ({
  children,
  className,
  elementType,
  placement = TooltipPosition.TOP,
  tooltipId = DataTooltipId.MAIN_TOOLTIP,
  tooltipPositionStrategy = TooltipPositionStrategy.ABSOLUTE,
  hasToShowTooltip = true,
  tooltipContent,
}) => {
  const isStringContent = typeof tooltipContent === 'string';
  const contentDataAttribute = isStringContent
    ? 'data-tooltip-content'
    : 'data-tooltip-html';
  const adaptedTooltipContent = isStringContent
    ? tooltipContent
    : renderToStaticMarkup(tooltipContent);
  const tooltipAttributes = hasToShowTooltip
    ? {
        'data-tooltip-id': tooltipId,
        'data-tooltip-place': placement,
        'data-tooltip-position-strategy': tooltipPositionStrategy,
        [contentDataAttribute]: adaptedTooltipContent,
      }
    : {};

  return createElement(
    elementType,
    {
      ...tooltipAttributes,
      className,
    },
    children,
  );
};

export { ElementWithTooltip, type ElementWithTooltipProperties };
