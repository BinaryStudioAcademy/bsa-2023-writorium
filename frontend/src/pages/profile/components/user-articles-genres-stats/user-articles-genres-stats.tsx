import {
  Cell,
  LabelList,
  Legend,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import { Loader } from '~/libs/components/components.js';
import { Select } from '~/libs/components/select/select.js';
import { DataStatus } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useCallback,
  useDeepCompareEffect,
} from '~/libs/hooks/hooks.js';
import { type ArticleGenreStatsFilters } from '~/packages/articles/articles.js';
import { actions as usersActions } from '~/slices/users/users.js';

import { GenresList } from './libs/components/components.js';
import {
  articleStatusOptions,
  DEFAULT_FILTER_PAYLOAD,
  GENRES_CHART_COLORS,
  GENRES_CHART_PLACEHOLDER_COLOR,
  GENRES_CHART_PLACEHOLDER_DATA,
  GENRES_CHART_PLACEHOLDER_FONT_SIZE,
  GENRES_CHART_PLACEHOLDER_LABEL_COLOR,
  GENRES_CHART_PLACEHOLDER_LABEL_POSITION,
} from './libs/constants/constants.js';
import { GenresChartConfig } from './libs/enums/enums.js';
import { normalizeGenresStats } from './libs/helpers/helpers.js';
import styles from './styles.module.scss';

type Properties = {
  className?: string;
};

const UserArticlesGenresStats: React.FC<Properties> = ({ className }) => {
  const dispatch = useAppDispatch();
  const { control, errors, watch } = useAppForm<ArticleGenreStatsFilters>({
    defaultValues: DEFAULT_FILTER_PAYLOAD,
  });

  const filters = watch();
  const { userArticlesGenresStats, userArticlesGenresStatsStatus } =
    useAppSelector(({ users }) => users);

  const handleDataLoad = useCallback(
    (filters: ArticleGenreStatsFilters) => {
      return void dispatch(usersActions.getUserArticlesGenresStats(filters));
    },
    [dispatch],
  );
  useDeepCompareEffect(() => {
    handleDataLoad(filters);
  }, [filters]);

  const chartData = normalizeGenresStats(
    userArticlesGenresStats,
    GenresChartConfig.MAX_VISIBLE_GENRES,
  );

  const isArticlesExist = Boolean(chartData.length);

  return (
    <div className={getValidClassNames(styles.wrapper, className)}>
      <h3 className={styles.title}>Genres Stats</h3>
      <div className={styles.chartWrapper}>
        {userArticlesGenresStatsStatus === DataStatus.PENDING && (
          <Loader isLoading type="dots" />
        )}
        {userArticlesGenresStatsStatus === DataStatus.FULFILLED && (
          <>
            <form className={styles.form} name="FiltersForm">
              <div>
                <Select
                  name="articlePublishedStatus"
                  placeholder="Choose article status..."
                  label=""
                  options={articleStatusOptions}
                  control={control}
                  errors={errors}
                  isDisabled={!isArticlesExist}
                />
              </div>
            </form>
            <ResponsiveContainer
              width="100%"
              height="100%"
              className={styles.responsiveContainer}
            >
              <RechartsPieChart
                width={GenresChartConfig.SIZE}
                height={GenresChartConfig.SIZE}
              >
                {isArticlesExist ? (
                  <>
                    <Pie
                      cx="50%"
                      cy="50%"
                      label={false}
                      dataKey="count"
                      labelLine={false}
                      data={chartData}
                      innerRadius={GenresChartConfig.INNER_RADIUS}
                      outerRadius={GenresChartConfig.OUTER_RADIUS}
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={entry.key as React.Key}
                          fill={
                            GENRES_CHART_COLORS?.[
                              index % GENRES_CHART_COLORS.length
                            ]
                          }
                        />
                      ))}
                    </Pie>
                    <Legend
                      layout="vertical"
                      align="center"
                      verticalAlign="bottom"
                      content={<GenresList genresStatistics={chartData} />}
                    />
                    <Tooltip />
                  </>
                ) : (
                  <Pie
                    cx="50%"
                    cy="50%"
                    dataKey="count"
                    innerRadius={GenresChartConfig.INNER_RADIUS}
                    outerRadius={GenresChartConfig.OUTER_RADIUS}
                    data={GENRES_CHART_PLACEHOLDER_DATA}
                    fill={GENRES_CHART_PLACEHOLDER_COLOR}
                  >
                    <LabelList
                      dataKey="lable"
                      position={GENRES_CHART_PLACEHOLDER_LABEL_POSITION}
                      fontSize={GENRES_CHART_PLACEHOLDER_FONT_SIZE}
                      fill={GENRES_CHART_PLACEHOLDER_LABEL_COLOR}
                      stroke="none"
                    />
                  </Pie>
                )}
              </RechartsPieChart>
            </ResponsiveContainer>
          </>
        )}
      </div>
    </div>
  );
};

export { UserArticlesGenresStats };
