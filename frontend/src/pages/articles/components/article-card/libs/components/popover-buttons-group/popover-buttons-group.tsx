import { Link as RouterLink } from 'react-router-dom';

import { Button, Icon } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { type ArticleResponseDto } from '~/packages/articles/articles.js';

import styles from './styles.module.scss';

type Properties = {
  // trigger: {
  //   handleToggleModalOpen: () => void;
  //   isOpen: boolean;
  // };
  isOwnArticle: boolean;
  article: ArticleResponseDto;
};

const PopoverButtonsGroup: React.FC<Properties> = ({
  isOwnArticle,
  article,
}) => {
  const { id } = article;

  return (
    <div className={styles.buttonsGroup}>
      <Button
        label={
          <>
            <Icon iconName="favorite" className={styles.editIcon} />
            <span>Add to favorites</span>
          </>
        }
        onClick={(): void => {}}
        className={styles.bookmarkBtn}
      />

      {isOwnArticle && (
        <>
          <RouterLink
            to={AppRoute.EDIT_ARTICLE.replace(':id', id.toString())}
            state={article}
            className={styles.editLink}
          >
            <Button
              label={
                <>
                  <Icon iconName="edit" className={styles.editIcon} />
                  <span>Edit</span>
                </>
              }
            />
          </RouterLink>

          <Button
            label={
              <>
                <Icon iconName="trashBin" className={styles.editIcon} />
                <span>Delete</span>
              </>
            }
            className={styles.deleteBtn}
            onClick={(): void => {}}
          />
        </>
      )}
    </div>
  );
};

export { PopoverButtonsGroup };
