import { type ChangeEvent, type FC } from 'react';

import { Avatar, Button, ErrorMessage } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useRef, useState } from '~/libs/hooks/hooks.js';
import { fileApi } from '~/libs/packages/image/file-api.js';
import { type UserAuthResponseDto } from '~/packages/users/users.js';

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
  const [previewUrl, setPreviewUrl] = useState<string | null>(user.avatarUrl);
  const reference = useRef<HTMLLabelElement>(null);

  const handleUploadUserAvatar = useCallback(
    (event_: ChangeEvent<HTMLInputElement>): void => {
      const [image] = event_.target.files ?? [];

      if (image) {
        const formData = new FormData();
        formData.append('file', image);

        void fileApi
          .uploadFile(formData)
          .then((fileData) => {
            onUpdateAvatarId(fileData.id);
            setPreviewUrl(fileData.url);
            onErrorUpload(null);
          })
          .catch((error: unknown) => {
            if (error instanceof Error) {
              setPreviewUrl(null);
              onErrorUpload(error.message);
            }
          });
      }
    },
    [onErrorUpload, setPreviewUrl, onUpdateAvatarId],
  );

  const handleRemoveAvatar = useCallback(() => {
    onRemoveAvatar();
    setPreviewUrl(null);
    onErrorUpload(null);
  }, [onErrorUpload, onRemoveAvatar]);

  const handleUpdateAvatar = useCallback(() => {
    if (!reference.current) {
      return null;
    }

    reference.current.click();
  }, []);

  return (
    <div className={styles.imageGroup}>
      <label className={styles.imageWrapper} ref={reference} htmlFor="avatarId">
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
          accept=".jpg, .jpeg, .png, .webp, .bmp, .svg"
        />
      </label>
      <div className={styles.imageGroupControls}>
        <Button
          className={getValidClassNames(styles.control, styles.imageUpdate)}
          onClick={handleUpdateAvatar}
          label="Update"
        />
        <Button
          className={getValidClassNames(styles.control, styles.imageRemove)}
          onClick={handleRemoveAvatar}
          label="Remove"
        />
      </div>
      <ErrorMessage error={errorImageUpload as string} />
    </div>
  );
};

export { AvatarWrapper };
