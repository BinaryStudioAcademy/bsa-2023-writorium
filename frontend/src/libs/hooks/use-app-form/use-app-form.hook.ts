import { joiResolver } from '@hookform/resolvers/joi';
import {
  type Control,
  type DefaultValues,
  type FieldErrors,
  type FieldValues,
  useForm,
  type UseFormHandleSubmit,
  type UseFormReset,
  type ValidationMode,
} from 'react-hook-form';

import { type ValidationSchema } from '~/libs/types/types.js';

type Parameters<T extends FieldValues = FieldValues> = {
  defaultValues: DefaultValues<T>;
  validationSchema?: ValidationSchema;
  mode?: keyof ValidationMode;
};

type ReturnValue<T extends FieldValues = FieldValues> = {
  control: Control<T, null>;
  errors: FieldErrors<T>;
  handleSubmit: UseFormHandleSubmit<T>;
  isValid: boolean;
  isDirty: boolean;
  isSubmitting: boolean;
  handleReset: UseFormReset<T>;
};

const useAppForm = <T extends FieldValues = FieldValues>({
  validationSchema,
  defaultValues,
  mode,
}: Parameters<T>): ReturnValue<T> => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
    reset: handleReset,
  } = useForm<T>({
    mode,
    defaultValues,
    resolver: validationSchema ? joiResolver(validationSchema) : undefined,
  });

  return {
    isValid,
    control,
    errors,
    handleSubmit,
    handleReset,
    isDirty,
    isSubmitting,
  };
};

export { useAppForm };
