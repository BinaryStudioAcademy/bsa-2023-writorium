import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import { type GroupBase, type Props, type StylesConfig } from 'react-select';
import { default as ReactSelect } from 'react-select';

import { useCallback, useFormController } from '~/libs/hooks/hooks.js';
import { type SelectOption } from '~/libs/types/types.js';

import {
  DropdownIndicator,
  IndicatorSeparator,
} from './libs/components/components.js';
import { Colors } from './libs/enums/colors.enum.js';
import cssStyles from './styles.module.scss';

type Properties<
  T extends FieldValues,
  IsMulti extends boolean = false,
  Group extends GroupBase<SelectOption> = GroupBase<SelectOption>,
> = Props<SelectOption, IsMulti, Group> & {
  name: FieldPath<T>;
  control: Control<T, null>;
  errors: FieldErrors<T>;
  label: string;
};

const Select = <
  T extends FieldValues,
  IsMulti extends boolean = false,
  Group extends GroupBase<SelectOption> = GroupBase<SelectOption>,
>({
  placeholder = 'Search...',
  styles,
  name,
  control,
  errors,
  label,
  ...restProperties
}: Properties<T, IsMulti, Group>): JSX.Element => {
  const { field } = useFormController({ name, control });
  const error = errors[name]?.message;
  const hasError = Boolean(error);

  const defaultStyles: StylesConfig<SelectOption, IsMulti, Group> = {
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

  const OnChange = (option: unknown): void => {
    field.onChange((option as SelectOption).value);
  };
  const handleChange = useCallback(
    (option: unknown) => OnChange(option),
    [OnChange],
  );

  return (
    <label>
      <span className={cssStyles.title}>{label}</span>
      <ReactSelect
        {...restProperties}
        onChange={handleChange}
        placeholder={placeholder}
        styles={{ ...defaultStyles, ...styles }}
        components={{ DropdownIndicator, IndicatorSeparator }}
      />
      {hasError && <span className={cssStyles.error}>{error as string}</span>}
    </label>
  );
};

export { Select };
