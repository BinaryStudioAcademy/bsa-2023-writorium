import { type GroupBase, type StylesConfig } from 'react-select';

import { type SelectOption } from '~/libs/types/types.js';

import { Color } from '../enums/enums.js';

const getDefaultStyles = <
  isMulti extends boolean = false,
  Group extends GroupBase<SelectOption> = GroupBase<SelectOption>,
>(): StylesConfig<SelectOption, isMulti, Group> => {
  const defaultStyles: StylesConfig<SelectOption, isMulti, Group> = {
    dropdownIndicator: (styles, state) => ({
      ...styles,
      padding: '0 8px',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : '',
      color: Color.DARK_GREEN,
      cursor: 'pointer',
    }),
    control: (styles, state) => ({
      ...styles,
      width: '100%',
      height: '45px',
      marginTop: '5px',
      paddingLeft: '16px',
      display: 'flex',
      alignItems: 'center',
      color:
        state.isFocused || state.hasValue || state.menuIsOpen
          ? Color.BLACK
          : Color.INPUT_TEXT,
      fontSize: '14px',
      fontFamily: 'Lato, sans-serif',
      background: Color.INPUT_BG,
      border:
        state.isFocused || state.hasValue || state.menuIsOpen
          ? `2px solid ${Color.LIGHT_GREEN}`
          : '2px solid transparent',
      borderRadius: '7px',
      outline: 'none',
      boxShadow:
        state.isFocused || state.hasValue || state.menuIsOpen
          ? `0 4px 8px -2px ${Color.INPUT_SHADOW_COLOR}`
          : 'none',
      ':hover': {
        cursor: 'pointer',
        border: `2px solid ${Color.LIGHT_GREEN}`,
      },
      ':active': {
        border: `2px solid ${Color.LIGHT_GREEN}`,
      },
    }),
    valueContainer: (styles) => ({
      ...styles,
      padding: '0',
    }),
    input: (styles) => ({
      ...styles,
      padding: '0',
      margin: '0',
    }),
    option: (styles, state) => ({
      ...styles,
      backgroundColor: state.isSelected ? Color.LIGHT_GREEN : 'inherit',
      ':active': {
        backgroundColor: 'none',
      },
      ':hover': {
        backgroundColor: state.isSelected
          ? Color.LIGHT_GREEN
          : Color.LIGHT_GREY,
        cursor: 'pointer',
      },
    }),
    placeholder: (styles) => ({
      ...styles,
      fontSize: '14px',
      color: Color.INPUT_PLACEHOLDER_COLOR,
    }),
    clearIndicator: (styles) => ({
      ...styles,
      padding: '0',
    }),
  };
  return defaultStyles;
};

export { getDefaultStyles };
