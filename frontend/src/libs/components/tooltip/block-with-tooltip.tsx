import { type FC } from 'react';

import {
  ElementWithTooltip,
  type ElementWithTooltipProperties,
} from './element-with-tooltip.js';

type Properties = Omit<ElementWithTooltipProperties, 'elementType'>;

const BlockWithTooltip: FC<Properties> = ({ children, ...restProperties }) => {
  return (
    <ElementWithTooltip {...restProperties} elementType="div">
      {children}
    </ElementWithTooltip>
  );
};

export { BlockWithTooltip };
