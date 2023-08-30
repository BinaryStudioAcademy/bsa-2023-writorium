import { type BaseSyntheticEvent, type FC } from 'react';

import { Button, Input } from '~/libs/components/components.js';
import { ButtonType, InputType } from '~/libs/enums/enums.js';
import { useAppForm, useCallback } from '~/libs/hooks/hooks.js';
import {
  type UserAuthResponseDto,
  type UserUpdateRequestDto,
  userUpdateValidationSchema,
} from '~/packages/users/users.js';

import styles from './styles.module.scss';

type Properties = {
  user: UserAuthResponseDto;
  onUpdateUser: (payload: UserUpdateRequestDto) => void;
  onEdit: (value: boolean) => void;
};

const ProfileEditForm: FC<Properties> = ({
  user,
  onUpdateUser,
  onEdit,
}: Properties) => {
  const {
    control,
    errors,
    handleSubmit,
    handleReset,
    isDirty,
    isSubmitting,
    isValid,
  } = useAppForm<UserUpdateRequestDto>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
    validationSchema: userUpdateValidationSchema,
  });

  const handleUpdateUserDetails = useCallback(
    (event_: BaseSyntheticEvent): void => {
      void handleSubmit(onUpdateUser)(event_);

      if (isValid) {
        onEdit(false);
      }
    },
    [handleSubmit, onUpdateUser, onEdit, isValid],
  );

  const handleCancel = useCallback(() => {
    onEdit(false);
    handleReset();
  }, [onEdit, handleReset]);

  return (
    <form className={styles.form} onSubmit={handleUpdateUserDetails}>
      <div className={styles.fieldset}>
        <Input
          type={InputType.TEXT}
          label="First Name"
          placeholder="Enter your first name"
          name="firstName"
          control={control}
          errors={errors}
        />
        <Input
          type={InputType.TEXT}
          label="Last Name"
          placeholder="Enter your last name"
          name="lastName"
          control={control}
          errors={errors}
        />
        <Input
          type={InputType.EMAIL}
          label="Email"
          placeholder="Enter your email"
          name="email"
          control={control}
          errors={errors}
        />
      </div>
      <div className={styles.buttonsBlock}>
        <Button
          type={ButtonType.BUTTON}
          label="Cancel"
          className={styles.button}
          onClick={handleCancel}
        />
        <Button
          type={ButtonType.SUBMIT}
          label="Save"
          disabled={!isDirty || isSubmitting}
          className={styles.button}
        />
      </div>
    </form>
  );
};

export { ProfileEditForm };
