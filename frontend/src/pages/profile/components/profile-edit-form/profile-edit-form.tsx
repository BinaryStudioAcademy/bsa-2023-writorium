import { Button, Input } from '~/libs/components/components.js';
import {
  useAppDispatch,
  useAppForm,
  useCallback,
  useState,
} from '~/libs/hooks/hooks.js';
import { type ReactBaseSyntheticEvent } from '~/libs/types/types.js';
import {
  type UserAuthResponseDto,
  type UserUpdateRequestDto,
  userUpdateValidationSchema,
} from '~/packages/users/users.js';
import { actions as usersActions } from '~/slices/users/users.js';

import { AvatarWrapper } from '../avatar-wrapper/avatar-wrapper.js';
import styles from './styles.module.scss';

type Properties = {
  user: UserAuthResponseDto;
  onEdit: (value: boolean) => void;
};

const ProfileEditForm: React.FC<Properties> = ({
  user,
  onEdit,
}: Properties) => {
  const dispatch = useAppDispatch();
  const {
    control,
    errors,
    handleSubmit,
    handleReset,
    isDirty,
    isSubmitting,
    isValid,
  } = useAppForm<Omit<UserUpdateRequestDto, 'avatarId'>>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
    validationSchema: userUpdateValidationSchema,
  });
  const [avatarId, setAvatarId] = useState<number | null>(user.avatarId);
  const [errorImageUpload, setErrorImageUpload] = useState<string | null>(null);

  const handleUpdateUser = useCallback(
    (payload: Omit<UserUpdateRequestDto, 'avatarId'>): void => {
      void dispatch(usersActions.updateUser({ ...payload, avatarId }));
    },
    [avatarId, dispatch],
  );

  const handleUpdateUserDetails = useCallback(
    (event_: ReactBaseSyntheticEvent): void => {
      if (errorImageUpload) {
        return;
      }

      void handleSubmit(handleUpdateUser)(event_);

      if (isValid) {
        onEdit(false);
      }
    },
    [errorImageUpload, handleSubmit, handleUpdateUser, isValid, onEdit],
  );

  const handleUpdateAvatarId = useCallback((value: number | null) => {
    setAvatarId(value);
  }, []);

  const handleErrorUpload = useCallback((value: string | null) => {
    setErrorImageUpload(value);
  }, []);

  const handleRemoveAvatar = useCallback(() => {
    setAvatarId(null);
  }, [setAvatarId]);

  const handleCancel = useCallback(() => {
    onEdit(false);
    handleReset();
  }, [onEdit, handleReset]);

  return (
    <form className={styles.form} onSubmit={handleUpdateUserDetails}>
      <div className={styles.fieldset}>
        <AvatarWrapper
          user={user}
          errorImageUpload={errorImageUpload}
          onErrorUpload={handleErrorUpload}
          onRemoveAvatar={handleRemoveAvatar}
          onUpdateAvatarId={handleUpdateAvatarId}
        />
        <Input
          type="text"
          label="First Name"
          placeholder="Enter your first name"
          name="firstName"
          control={control}
          errors={errors}
        />
        <Input
          type="text"
          label="Last Name"
          placeholder="Enter your last name"
          name="lastName"
          control={control}
          errors={errors}
        />
        <Input
          type="email"
          label="Email"
          placeholder="Enter your email"
          name="email"
          control={control}
          errors={errors}
        />
      </div>
      <div className={styles.buttonsBlock}>
        <Button
          hasFullWidth
          label="Cancel"
          variant="greenOutlined"
          type="button"
          onClick={handleCancel}
        />
        <Button
          hasFullWidth
          label="Save"
          type="submit"
          isDisabled={(!isDirty && avatarId === user.avatarId) || isSubmitting}
        />
      </div>
    </form>
  );
};

export { ProfileEditForm };
