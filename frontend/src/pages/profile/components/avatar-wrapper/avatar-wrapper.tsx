import {
  Avatar,
  ErrorMessage,
  Icon,
  IconButton,
} from '~/libs/components/components.js';
import { FILE_KEY } from '~/libs/constants/constants.js';
import { InputType } from '~/libs/enums/enums.js';
import { getFullName, getValidClassNames } from '~/libs/helpers/helpers.js';
import { useAppDispatch, useCallback, useState } from '~/libs/hooks/hooks.js';
import { type ReactChangeEvent } from '~/libs/types/types.js';
import { type UserAuthResponseDto } from '~/packages/users/users.js';
import { actions as filesActions } from '~/slices/file/file.js';

import { SUPPORTED_FILE_TYPES_STRING } from '../../libs/constants/constants.js';
import styles from './styles.module.scss';

type Properties = {
  user: UserAuthResponseDto;
  errorImageUpload: string | null;
  className?: string;
  onRemoveAvatar: () => void;
  onUpdateAvatarId: (value: number | null) => void;
  onErrorUpload: (value: string | null) => void;
};

const AvatarWrapper: React.FC<Properties> = ({
  user,
  errorImageUpload,
  onRemoveAvatar,
  onUpdateAvatarId,
  onErrorUpload,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const [previewUrl, setPreviewUrl] = useState<string | null>(user.avatarUrl);

  const handleUploadUserAvatar = useCallback(
    (event_: ReactChangeEvent<HTMLInputElement>): void => {
      const [image] = event_.target.files ?? [];

      if (image) {
        const formData = new FormData();
        formData.append(FILE_KEY, image);

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
          username={getFullName(user.firstName, user.lastName)}
          avatarUrl={previewUrl}
          className={styles.avatar}
        />
        <input
          className="visually-hidden"
          id="avatarId"
          onChange={handleUploadUserAvatar}
          type={InputType.FILE}
          accept={SUPPORTED_FILE_TYPES_STRING}
        />
        <span
          className={getValidClassNames(
            styles.iconButtonEdit,
            styles.iconButton,
          )}
        >
          <Icon iconName="edit" className={styles.iconEdit} />
        </span>
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
