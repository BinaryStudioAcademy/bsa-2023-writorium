import { Icon, IconButton, Link } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { configureString } from '~/libs/helpers/helpers.js';
import { useCallback } from '~/libs/hooks/hooks.js';
import { type ArticleResponseDto } from '~/packages/articles/articles.js';

import styles from './styles.module.scss';

type Properties = {
  isOwnArticle: boolean;
  article: ArticleResponseDto;
  onDeleteArticle: (id: number) => void;
  onToggleFavouriteClick: () => void;
  isToggleFavouriteLoading: boolean;
};

const PopoverButtonsGroup: React.FC<Properties> = ({
  isOwnArticle,
  article,
  onDeleteArticle,
  onToggleFavouriteClick,
  isToggleFavouriteLoading,
}) => {
  const { id, isFavourite } = article;

  const handleDeleteArticle = useCallback(() => {
    onDeleteArticle(id);
  }, [id, onDeleteArticle]);

  return (
    <div className={styles.buttonsGroup}>
      <IconButton iconName="favorite" label="Add to favorites" />
      {isOwnArticle && (
        <>
          <Link
            to={
              configureString(AppRoute.ARTICLES_EDIT_$ID, {
                id: String(id),
              }) as typeof AppRoute.ARTICLES_EDIT_$ID
            }
            state={article}
            className={styles.editLink}
          >
            <Icon iconName="edit" />
            Edit
          </Link>
          <IconButton
            iconName="trashBin"
            label="Delete"
            onClick={handleDeleteArticle}
          />
          <IconButton
            className={styles.iconButton}
            iconName={isFavourite ? 'favoriteFilled' : 'favorite'}
            iconClassName={styles.pointerIcon}
            onClick={onToggleFavouriteClick}
            isLoading={isToggleFavouriteLoading}
          />
        </>
      )}
    </div>
  );
};

export { PopoverButtonsGroup };
