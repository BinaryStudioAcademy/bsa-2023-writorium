import { type ChangeEvent, type FC } from 'react';

import { Avatar, ErrorMessage } from '~/libs/components/components.js';
import { IconButton } from '~/libs/components/icon-button/icon-button.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useAppDispatch, useCallback, useState } from '~/libs/hooks/hooks.js';
import { type UserAuthResponseDto } from '~/packages/users/users.js';
import { SUPPORTED_FILE_TYPES_STRING } from '~/pages/profile/constants/constants.js';
import { actions as filesActions } from '~/slices/file/file.js';

import styles from './styles.module.scss';

type Properties = {
  user: UserAuthResponseDto;
  errorImageUpload: string | null;
  className?: string;
  onRemoveAvatar: () => void;
  onUpdateAvatarId: (value: number | null) => void;
  onErrorUpload: (value: string | null) => void;
};

const AvatarWrapper: FC<Properties> = ({
  user,
  errorImageUpload,
  onRemoveAvatar,
  onUpdateAvatarId,
  onErrorUpload,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const [previewUrl, setPreviewUrl] = useState<string | null>(user.avatarUrl);

  const handleUploadUserAvatar = useCallback(
    (event_: ChangeEvent<HTMLInputElement>): void => {
      const [image] = event_.target.files ?? [];

      if (image) {
        const formData = new FormData();
        formData.append('file', image);

        void dispatch(filesActions.uploadFile(formData))
          .unwrap()
          .then((fileData) => {
            onUpdateAvatarId(fileData.id);
            setPreviewUrl(fileData.url);
            onErrorUpload(null);
          })
          .catch((error: Error) => {
            onErrorUpload(error.message);
          });
      }
    },
    [dispatch, onUpdateAvatarId, onErrorUpload],
  );

  const handleRemoveAvatar = useCallback(() => {
    onRemoveAvatar();
    setPreviewUrl(null);
    onErrorUpload(null);
  }, [onErrorUpload, onRemoveAvatar]);

  return (
    <div className={styles.imageGroup}>
      <label className={styles.imageWrapper} htmlFor="avatarId">
        <Avatar
          username={`${user.firstName} ${user.lastName}`}
          avatarUrl={previewUrl}
          className={styles.avatar}
        />
        <input
          className="visually-hidden"
          id="avatarId"
          onChange={handleUploadUserAvatar}
          type="file"
          accept={SUPPORTED_FILE_TYPES_STRING}
        />
        <IconButton
          iconName="edit"
          className={getValidClassNames(
            styles.iconButtonEdit,
            styles.iconButton,
          )}
          iconClassName={styles.iconEdit}
        />
      </label>
      {previewUrl && (
        <IconButton
          iconName="crossMark"
          className={getValidClassNames(
            styles.iconButtonRemove,
            styles.iconButton,
          )}
          iconClassName={styles.iconRemove}
          onClick={handleRemoveAvatar}
        />
      )}
      <ErrorMessage error={errorImageUpload as string} />
    </div>
  );
};

export { AvatarWrapper };
