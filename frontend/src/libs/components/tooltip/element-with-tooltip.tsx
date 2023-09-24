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

import { DataTooltipKey } from './libs/enums/enums.js';

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
    ? DataTooltipKey.CONTENT
    : DataTooltipKey.HTML;
  const adaptedTooltipContent = isStringContent
    ? tooltipContent
    : renderToStaticMarkup(tooltipContent);
  const tooltipAttributes = hasToShowTooltip
    ? {
        [DataTooltipKey.ID]: tooltipId,
        [DataTooltipKey.PLACE]: placement,
        [DataTooltipKey.POSITION_STRATEGY]: tooltipPositionStrategy,
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
