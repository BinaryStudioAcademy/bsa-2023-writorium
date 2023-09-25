import {
  ElementWithTooltip,
  type ElementWithTooltipProperties,
} from './element-with-tooltip.js';

type Properties = Omit<ElementWithTooltipProperties, 'elementType'>;

const BlockWithTooltip: React.FC<Properties> = ({
  children,
  ...restProperties
}) => (
  <ElementWithTooltip {...restProperties} elementType="div">
    {children}
  </ElementWithTooltip>
);

export { BlockWithTooltip };
