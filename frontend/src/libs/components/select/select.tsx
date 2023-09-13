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
import { type SelectOption } from '~/libs/types/types.js';

import {
  DropdownIndicator,
  IndicatorSeparator,
} from './libs/components/components.js';
import { getDefaultStyles } from './libs/constants/constants.js';
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
  options,
  isMulti,
  ...restProperties
}: Properties<T, IsMulti, Group>): JSX.Element => {
  const { field } = useFormController({ name, control });
  const error = errors[name]?.message;

  const handleChange = useCallback(
    (option: unknown) => {
      field.onChange((option as SelectOption).value);
    },
    [field],
  );

  const handleSelectValue = (
    value: string | number | (string | number)[],
  ): SelectOption | SelectOption[] | undefined => {
    return isMulti
      ? (options as SelectOption[])?.filter((option) => {
          return (value as Array<string | number>).includes(
            (option ).value,
          );
        })
      : (options as SelectOption[])?.find(
          (opt) => (opt ).value === value,
        );
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
        value={
          handleSelectValue(field.value) ??
          ({ value: '', label: placeholder } as SelectOption)
        }
      />
      <ErrorMessage error={error as string} />
    </label>
  );
};

export { Select };
