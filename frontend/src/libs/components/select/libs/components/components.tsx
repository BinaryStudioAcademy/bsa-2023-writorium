import { components } from 'react-select';

import Arrow from '../../../../../assets/img/arrow.svg';

const IndicatorSeparator = (): null => null;

const DropdownIndicator: typeof components.DropdownIndicator = (properties) => {
  return (
    <components.DropdownIndicator {...properties}>
      <img src={Arrow} alt="" />
    </components.DropdownIndicator>
  );
};

export { DropdownIndicator, IndicatorSeparator };
