import { Link as RouterLink } from 'react-router-dom';

import { Button, Icon } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { useCallback } from '~/libs/hooks/hooks.js';
import { type ArticleResponseDto } from '~/packages/articles/articles.js';

import styles from './styles.module.scss';

type Properties = {
  isOwnArticle: boolean;
  article: ArticleResponseDto;
  onDeleteArticle: (id: number) => void;
};

const PopoverButtonsGroup: React.FC<Properties> = ({
  isOwnArticle,
  article,
  onDeleteArticle,
}) => {
  const { id } = article;

  const handleDeleteArticle = useCallback(() => {
    onDeleteArticle(id);
  }, [id, onDeleteArticle]);

  return (
    <div className={styles.buttonsGroup}>
      <Button
        label={
          <>
            <Icon iconName="favorite" />
            <span>Add to favorites</span>
          </>
        }
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
                  <Icon iconName="edit" />
                  <span>Edit</span>
                </>
              }
            />
          </RouterLink>
          <Button
            label={
              <>
                <Icon iconName="trashBin" />
                <span>Delete</span>
              </>
            }
            onClick={handleDeleteArticle}
          />
        </>
      )}
    </div>
  );
};

export { PopoverButtonsGroup };
