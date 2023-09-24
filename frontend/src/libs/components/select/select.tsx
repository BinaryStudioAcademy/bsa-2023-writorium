import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import { type GroupBase, type Props } from 'react-select';
import { default as ReactSelect } from 'react-select';

import { ErrorMessage } from '~/libs/components/components.js';
import { useCallback, useFormController } from '~/libs/hooks/hooks.js';

import {
  DropdownIndicator,
  IndicatorSeparator,
} from './libs/components/components.js';
import {
  DEFAULT_SELECT_PLACEHOLDER,
  getDefaultStyles,
} from './libs/constants/constants.js';
import {
  type SelectOption,
  type SelectOptions,
  type SelectValue,
} from './libs/types/types.js';
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
  placeholder = DEFAULT_SELECT_PLACEHOLDER,
  styles,
  name,
  control,
  errors,
  label,
  options,
  isMulti,
  isClearable = true,
  ...restProperties
}: Properties<T, IsMulti, Group>): JSX.Element => {
  const { field } = useFormController({ name, control });
  const error = errors[name]?.message;

  const handleChange = useCallback(
    (option: unknown) => {
      const fieldValue = (option as SelectOption)?.value ?? null;
      field.onChange(fieldValue);
    },
    [field],
  );

  const handleSelectValue = (value: SelectValue): SelectOptions => {
    return isMulti
      ? (options as SelectOption[])?.filter((option) => {
          return (value as Array<string | number>).includes(option.value);
        })
      : (options as SelectOption[])?.find((option) => option.value === value);
  };

  return (
    <label className={cssStyles.label}>
      <span className={cssStyles.title}>{label}</span>
      <ReactSelect
        {...restProperties}
        onChange={handleChange}
        placeholder={placeholder}
        styles={{ ...getDefaultStyles<IsMulti, Group>(), ...styles }}
        components={{ DropdownIndicator, IndicatorSeparator }}
        options={options}
        isMulti={isMulti}
        isClearable={isClearable}
        value={handleSelectValue(field.value) ?? null}
      />
      <ErrorMessage error={error as string} />
    </label>
  );
};

export { Select };
