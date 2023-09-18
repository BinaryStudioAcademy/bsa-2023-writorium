import { Icon, IconButton, Link } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { configureString } from '~/libs/helpers/helpers.js';
import { type ArticleResponseDto } from '~/packages/articles/articles.js';

import styles from './styles.module.scss';

type Properties = {
  isOwnArticle: boolean;
  article: ArticleResponseDto;
  handleDeleteButtonClick: () => void;
};

const PopoverButtonsGroup: React.FC<Properties> = ({
  isOwnArticle,
  article,
  handleDeleteButtonClick,
}) => {
  const { id } = article;

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
            onClick={handleDeleteButtonClick}
          />
        </>
      )}
    </div>
  );
};

export { PopoverButtonsGroup };
