import { matchPath } from 'react-router-dom';

import { Button, Icon, Input } from '~/libs/components/components.js';
import { Select } from '~/libs/components/select/select.js';
import { AppRoute } from '~/libs/enums/enums.js';
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
  const FILTERS_FORM_SUBMISSION_DELAY = 500;
  const { control, errors, watch, handleReset } = useAppForm<FilterFormValues>({
    defaultValues: DEFAULT_FILTER_PAYLOAD,
    mode: 'onChange',
  });
  const { pathname } = useLocation();
  const isMyArticlesPage = matchPath(
    { path: `${AppRoute.ARTICLES}/${AppRoute.ARTICLES_MY_ARTICLES}` },
    pathname,
  );
  const data: FilterFormValues = watch();

  useDeepCompareEffect(() => {
    const handler = setTimeout(() => {
      onSubmit(data);
    }, FILTERS_FORM_SUBMISSION_DELAY);
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
        <Button
          className={styles.clearFilters}
          label="Clear filters"
          onClick={formReset}
        />
      </div>
      <form className={styles.filterGroup} name="FiltersForm">
        <div className={styles.inputContainer}>
          <Input
            name="titleFilter"
            type="text"
            placeholder="Search..."
            label="Title"
            className={styles.filterInput}
            labelClassName={styles.filterTitle}
            control={control}
            errors={errors}
          />
          <Icon iconName="search" className={styles.searchIcon} />
        </div>
        {!isMyArticlesPage && (
          <Select
            name="authorId"
            placeholder="Search..."
            label="Author"
            control={control}
            errors={errors}
            options={authorsSelectOptions}
          />
        )}
        <Select
          name="genreId"
          placeholder="Search..."
          label="Genre"
          options={genreSelectOptions}
          control={control}
          errors={errors}
        />
      </form>
    </div>
  );
};

export { ArticleFilters };
