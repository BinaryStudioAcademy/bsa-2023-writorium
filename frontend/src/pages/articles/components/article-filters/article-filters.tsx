import { type default as React } from 'react';
import { matchPath } from 'react-router-dom';

import { Input } from '~/libs/components/components.js';
import { Select } from '~/libs/components/select/select.js';
import { AppRoute, ArticleSubRoute } from '~/libs/enums/enums.js';
import {
  useAppForm,
  useCallback,
  useDeepCompareEffect,
  useLocation,
} from '~/libs/hooks/hooks.js';
import { type SelectOption } from '~/libs/types/select-option.type.js';

import { type FilterFormValues } from '../../libs/types/types.js';
import { DEFAULT_FILTER_PAYLOAD } from './libs/constants/constants.js';
import styles from './styles.module.scss';

type Properties = {
  genreSelectOptions: SelectOption[];
  authorsSelectOptions: SelectOption[];
  onSubmit: (payload: FilterFormValues) => void;
};

const ArticleFilters: React.FC<Properties> = ({
  genreSelectOptions,
  authorsSelectOptions,
  onSubmit,
}) => {
  const { control, errors, watch, handleReset } = useAppForm<FilterFormValues>({
    defaultValues: DEFAULT_FILTER_PAYLOAD,
    mode: 'onChange',
  });
  const { pathname } = useLocation();
  const isMyArticlesPage = matchPath(
    { path: `${AppRoute.ARTICLES}/${ArticleSubRoute.MY_ARTICLES}` },
    pathname,
  );
  const data: FilterFormValues = watch();

  useDeepCompareEffect(() => {
    const handler = setTimeout(() => {
      onSubmit(data);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [data]);

  const formReset = useCallback(() => {
    handleReset(DEFAULT_FILTER_PAYLOAD);
  }, [handleReset]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <span className={styles.filterTitle}>Filter</span>
        <button className={styles.clearFilters} onClick={formReset}>
          Clear filters
        </button>
      </div>
      <form className={styles.form} name="FiltersForm">
        <div className={styles.filterGroup}>
          <Input
            name="titleFilter"
            type="text"
            placeholder="Search.."
            label="Title"
            labelClassName={styles.filterTitle}
            control={control}
            errors={errors}
          />
          {!isMyArticlesPage && (
            <Select
              name="authorId"
              placeholder="Search.."
              label="Author"
              control={control}
              errors={errors}
              options={authorsSelectOptions}
            />
          )}

          <Select
            name="genreId"
            placeholder="Search.."
            label="Genre"
            options={genreSelectOptions}
            control={control}
            errors={errors}
          />
        </div>
      </form>
    </div>
  );
};

export { ArticleFilters };
