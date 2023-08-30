import { joiResolver } from '@hookform/resolvers/joi';
import {
  type Control,
  type DefaultValues,
  type FieldErrors,
  type FieldValues,
  type UseFormHandleSubmit,
  type UseFormReset,
  type ValidationMode,
} from 'react-hook-form';
import { useForm } from 'react-hook-form';

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
  reset: UseFormReset<T>;
  isValid: boolean;
  isDirty: boolean;
  isSubmitting: boolean;
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
    reset,
  } = useForm<T>({
    mode,
    defaultValues,
    resolver: validationSchema ? joiResolver(validationSchema) : undefined,
  });

  return {
    isDirty,
    isValid,
    isSubmitting,
    control,
    errors,
    handleSubmit,
    reset,
  };
};

export { useAppForm };
