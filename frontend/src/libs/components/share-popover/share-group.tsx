import { type FC } from 'react';

import { DataStatus } from '~/libs/enums/data-status.enum.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
} from '~/libs/hooks/hooks.js';
import {
  actions as articleActions,
  actions as articlesActions,
} from '~/slices/articles/articles.js';

import { IconButton } from '../icon-button/icon-button.js';
import { Loader } from '../loader/loader.js';
import { ShareOnFacebookButton } from '../share-on-facebook-button/share-on-facebook-button.js';
import styles from './styles.module.scss';

type Properties = {
  articleId: string;
  articleTitle: string;
};

const ShareGroup: FC<Properties> = ({ articleId: id, articleTitle }) => {
  const dispatch = useAppDispatch();
  const { sharedLink, sharedLinkDataStatus } = useAppSelector(
    ({ articles }) => articles,
  );

  useEffect(() => {
    void dispatch(articleActions.getSharedLink({ id }));

    return () => {
      void dispatch(articleActions.resetSharedLink());
    };
  }, [dispatch, id]);

  const handleShareButtonClick = useCallback((): void => {
    if (sharedLink) {
      void dispatch(articlesActions.copySharedLink());
    }
  }, [dispatch, sharedLink]);

  const isLoading = sharedLinkDataStatus === DataStatus.PENDING;

  if (sharedLinkDataStatus === DataStatus.REJECTED) {
    return null;
  }

  return (
    <Loader
      isLoading={isLoading}
      type="circular"
      overlayClassName={styles.loader}
    >
      {sharedLink && (
        <ul className={styles.fullWidth}>
          <li className={styles.groupItem}>
            <ShareOnFacebookButton
              label="With Facebook"
              title={articleTitle}
              articleUrl={sharedLink}
              className={styles.fullWidth}
              classNameContent={styles.button}
              iconStyle={styles.icon}
            />
          </li>
          <li className={styles.groupItem}>
            <IconButton
              iconName="link"
              onClick={handleShareButtonClick}
              label="Copy link"
              className={styles.button}
              iconClassName={styles.icon}
            />
          </li>
        </ul>
      )}
    </Loader>
  );
};

export { ShareGroup };
