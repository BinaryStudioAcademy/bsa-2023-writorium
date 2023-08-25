import { components } from 'react-select';

import { Icon } from '~/libs/components/components.js';

const IndicatorSeparator = (): null => null;

const DropdownIndicator: typeof components.DropdownIndicator = (properties) => {
  return (
    <components.DropdownIndicator {...properties}>
      <Icon iconName="arrowDown" />
    </components.DropdownIndicator>
  );
};

export { DropdownIndicator, IndicatorSeparator };
