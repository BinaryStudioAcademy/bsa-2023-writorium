import { Link } from 'react-router-dom';

import { AppRoute } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
} from '~/libs/hooks/hooks.js';
import { actions as articlesActions } from '~/slices/articles/articles.js';

import styles from './styles.module.scss';

type Properties = {
  className?: string;
};

const UserLatestArticles: React.FC<Properties> = ({ className }) => {
  const dispatch = useAppDispatch();
  const { articles } = useAppSelector(({ articles }) => articles);

  const getLatest = useCallback(() => {
    void dispatch(
      articlesActions.fetchOwn({
        take: 5,
        skip: 0,
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    getLatest();
    return () => {
      dispatch(articlesActions.resetArticles());
    };
  }, [dispatch, getLatest]);

  return (
    <div className={getValidClassNames(className, styles.wrapper)}>
      <ol>
        {articles.map((article) => (
          <li key={article.id}>
            <Link to={AppRoute.ARTICLE.replace(':id', article.id.toString())}>
              {article.title}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export { UserLatestArticles };
