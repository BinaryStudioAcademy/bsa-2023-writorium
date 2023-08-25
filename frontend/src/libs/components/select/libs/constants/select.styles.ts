import { type GroupBase, type StylesConfig } from 'react-select';

import { type SelectOption } from '~/libs/types/select-option.type.js';

import { Colors } from '../enums/colors.enum.js';

const getDefaultStyles = <
  isMulti extends boolean = false,
  Group extends GroupBase<SelectOption> = GroupBase<SelectOption>,
>(): StylesConfig<SelectOption, isMulti, Group> => {
  const defaultStyles: StylesConfig<SelectOption, isMulti, Group> = {
    dropdownIndicator: (styles, state) => ({
      ...styles,
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : '',
      color: Colors.DARK_GREEN,
      cursor: 'pointer',
    }),
    control: (styles, state) => ({
      ...styles,
      padding: '5px 10px 5px 20px',
      borderRadius: '5px',
      border:
        state.isFocused || state.hasValue || state.menuIsOpen
          ? `1px solid ${Colors.LIGHT_GREEN}`
          : '1px solid transparent',
      ':hover': {
        cursor: 'pointer',
        border: `1px solid ${Colors.LIGHT_GREEN}`,
      },
      ':active': {
        border: `1px solid ${Colors.LIGHT_GREEN}`,
      },
      boxShadow: 'none',
    }),
    option: (styles, state) => ({
      ...styles,
      backgroundColor: state.isSelected ? Colors.LIGHT_GREEN : 'inherit',
      ':active': {
        backgroundColor: 'none',
      },
      ':hover': {
        backgroundColor: state.isSelected
          ? Colors.LIGHT_GREEN
          : Colors.LIGHT_GREY,
        cursor: 'pointer',
      },
    }),
    placeholder: (styles) => ({ ...styles, fontSize: '13px' }),
  };
  return defaultStyles;
};

export { getDefaultStyles };
