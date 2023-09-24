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
import {
  FILE_KEY,
  SUPPORTED_FILE_TYPES_STRING,
} from '~/libs/constants/constants.js';
import { InputType } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useEffect,
  useFormController,
  useReference,
  useState,
} from '~/libs/hooks/hooks.js';
import { type ReactChangeEvent } from '~/libs/types/types.js';
import { actions as appActions } from '~/slices/app/app.js';
import { actions as filesActions } from '~/slices/file/file.js';

import { ERROR_TYPE } from '../../constants/constants.js';
import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  errors: FieldErrors<T>;
  name: FieldPath<T>;
  initialPreviewUrl?: string | null;
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
  const initialWrapperId = useReference<number | null>(field.value);

  const handleUploadArticleCover = (
    event_: ReactChangeEvent<HTMLInputElement>,
  ): void => {
    const [image] = event_.target.files ?? [];

    if (image) {
      const formData = new FormData();
      formData.append(FILE_KEY, image);

      setIsUploadFileLoading(true);
      void dispatch(filesActions.uploadFile(formData))
        .unwrap()
        .then((fileData) => {
          field.onChange(fileData.id);
          setPreviewUrl(fileData.url);
        })
        .catch((error: Error) => {
          appActions.notify({ type: ERROR_TYPE, message: error.message });
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

  useEffect(() => {
    if (field.value === initialWrapperId.current) {
      setPreviewUrl(initialPreviewUrl as string | null);
    }

    if (!field.value) {
      setPreviewUrl(null);
    }
  }, [field, initialPreviewUrl, initialWrapperId]);

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
              type={InputType.FILE}
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
