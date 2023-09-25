import { matchPath } from 'react-router-dom';

import {
  Button,
  Icon,
  Input,
  ToggleCheckbox,
} from '~/libs/components/components.js';
import { Select } from '~/libs/components/select/select.js';
import { AppRoute } from '~/libs/enums/enums.js';
import {
  useAppForm,
  useCallback,
  useDeepCompareEffect,
  useLocation,
} from '~/libs/hooks/hooks.js';
import { type SelectOption } from '~/libs/types/types.js';

import { type FilterFormValues } from '../../libs/types/types.js';
import {
  DEFAULT_FILTER_PAYLOAD,
  FILTERS_FORM_SUBMISSION_DELAY,
} from './libs/constants/constants.js';
import styles from './styles.module.scss';

type Properties = {
  genreSelectOptions: SelectOption[];
  authorsSelectOptions: SelectOption[];
  onSubmit: (payload: FilterFormValues) => void;
  currentFilters?: FilterFormValues;
};

const ArticleFilters: React.FC<Properties> = ({
  genreSelectOptions,
  authorsSelectOptions,
  onSubmit,
  currentFilters,
}) => {
  const { control, errors, watch, handleReset } = useAppForm<FilterFormValues>({
    defaultValues: currentFilters ?? DEFAULT_FILTER_PAYLOAD,
    mode: 'onChange',
  });
  const { pathname } = useLocation();
  const isMyArticlesPage = matchPath(
    { path: AppRoute.ARTICLES_MY_ARTICLES },
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

  const handleFormReset = useCallback(() => {
    handleReset(DEFAULT_FILTER_PAYLOAD);
  }, [handleReset]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <span className={styles.filterTitle}>Filter</span>
        <Button
          size="small"
          variant="outlined"
          label="Clear filters"
          onClick={handleFormReset}
        />
      </div>
      <form className={styles.filterGroup} name="FiltersForm">
        <div className={styles.inputWrapper}>
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
        <ToggleCheckbox
          name="showFavourites"
          control={control}
          errors={errors}
          label="Show only favorite articles"
        />
      </form>
    </div>
  );
};

export { ArticleFilters };
