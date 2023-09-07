import { Icon } from '~/libs/components/components.js';
import { SUPPORTED_FILE_TYPES_STRING } from '~/pages/profile/libs/constants/constants.js';

import styles from './styles.module.scss';

const ArticleCoverUpload: React.FC = () => {
  return (
    <div className={styles.uploadWrapper}>
      <div className={styles.header}>
        <p className={styles.uploadTitle}>Add a cover image</p>
        <p className={styles.removeButton}>Remove</p>
      </div>
      <div className={styles.coverContainer}>
        <img
          alt="article cover"
          src="https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg"
        />
      </div>
      <div className={styles.dropArea}>
        <input
          accept={SUPPORTED_FILE_TYPES_STRING}
          type="file"
          id="coverImg"
          className={styles.fileInput}
        />
        <p className={styles.dropAreaHint}>
          <Icon iconName="image" className={styles.imageIcon} /> Drag and drop
          an image here or
          <span className={styles.chooseImageButton}>choose image</span>
        </p>
      </div>
    </div>
  );
};

export { ArticleCoverUpload };
