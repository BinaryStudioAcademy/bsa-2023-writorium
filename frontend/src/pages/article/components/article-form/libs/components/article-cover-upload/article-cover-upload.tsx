import { type ChangeEvent } from 'react';
import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import {
  ErrorMessage,
  Icon,
  IconButton,
  Loader,
} from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useFormController,
  useState,
} from '~/libs/hooks/hooks.js';
import { SUPPORTED_FILE_TYPES_STRING } from '~/pages/profile/libs/constants/constants.js';
import { appActions } from '~/slices/app/app.js';
import { actions as filesActions } from '~/slices/file/file.js';

import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  errors: FieldErrors<T>;
  name: FieldPath<T>;
  initialPreviewUrl?: string;
};

const ArticleCoverUpload = <T extends FieldValues>({
  name,
  errors,
  control,
  initialPreviewUrl,
}: Properties<T>): React.ReactNode => {
  const dispatch = useAppDispatch();
  const { field } = useFormController({ name, control });
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialPreviewUrl ?? null,
  );
  const [isDragActive, setIsDragActive] = useState(false);
  const [isUploadFileLoading, setIsUploadFileLoading] = useState(false);

  const error = errors[name]?.message;

  const handleUploadArticleCover = (
    event_: ChangeEvent<HTMLInputElement>,
  ): void => {
    const [image] = event_.target.files ?? [];

    if (image) {
      const formData = new FormData();
      formData.append('file', image);

      setIsUploadFileLoading(true);
      void dispatch(filesActions.uploadFile(formData))
        .unwrap()
        .then((fileData) => {
          field.onChange(fileData.id);
          setPreviewUrl(fileData.url);
        })
        .catch((error: Error) => {
          appActions.notify({ type: 'error', message: error.message });
          field.onChange(null);
        })
        .finally(() => {
          setIsUploadFileLoading(false);
        });
    }
  };

  const handleRemoveCover = (): void => {
    setPreviewUrl(null);
    field.onChange(null);
  };

  const handleDragEnter = (): void => {
    setIsDragActive(true);
  };

  const handleDragLeave = (): void => {
    setIsDragActive(false);
  };

  const handleDrop = (): void => {
    setIsDragActive(false);
  };

  return (
    <>
      <div className={styles.uploadWrapper}>
        <div className={styles.header}>
          <p className={styles.uploadTitle}>Add a cover image</p>
        </div>
        {isUploadFileLoading && <Loader isLoading type="dots" />}
        {previewUrl && (
          <div className={styles.coverContainer}>
            <div className={styles.removeCoverOverlay}>
              <IconButton
                iconName="trashBin"
                className={styles.removeButton}
                onClick={handleRemoveCover}
              />
            </div>
            <img alt="article cover" src={previewUrl} />
          </div>
        )}
        {!previewUrl && !isUploadFileLoading && (
          <div
            className={getValidClassNames(
              styles.dropArea,
              isDragActive && styles.dropAreaActive,
            )}
          >
            <input
              type="file"
              onDrop={handleDrop}
              className={styles.fileInput}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onChange={handleUploadArticleCover}
              accept={SUPPORTED_FILE_TYPES_STRING}
            />
            <p className={styles.dropAreaHint}>
              <Icon iconName="image" className={styles.imageIcon} /> Drag and
              drop an image here or
              <span className={styles.chooseImageButton}>choose image</span>
            </p>
          </div>
        )}
      </div>
      <ErrorMessage error={error as string} />
    </>
  );
};

export { ArticleCoverUpload };
