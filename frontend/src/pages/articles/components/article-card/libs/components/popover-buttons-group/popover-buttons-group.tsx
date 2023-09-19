import { Icon, IconButton, Link } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { configureString } from '~/libs/helpers/helpers.js';
import { type ArticleResponseDto } from '~/packages/articles/articles.js';

import styles from './styles.module.scss';

type Properties = {
  isOwnArticle: boolean;
  article: ArticleResponseDto;
  onDeleteButtonClick: () => void;
  onToggleFavouriteClick: () => void;
  isToggleFavouriteLoading: boolean;
};

const PopoverButtonsGroup: React.FC<Properties> = ({
  isOwnArticle,
  article,
  onDeleteButtonClick,
}) => {
  const { id } = article;

  return (
    <div className={styles.buttonsGroup}>
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
            onClick={onDeleteButtonClick}
          />
        </>
      )}
    </div>
  );
};

export { PopoverButtonsGroup };
