import {
  Cell,
  Legend,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import { Loader } from '~/libs/components/components.js';
import { DataStatus } from '~/libs/enums/data-status.enum.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
} from '~/libs/hooks/hooks.js';
import { actions as usersActions } from '~/slices/users/users.js';

import { GENRES_CHART_COLORS } from './libs/constants/constants.js';
import { GenresChartConfig } from './libs/enums/genres-chart-config.enum.js';
import { normalizeGenresStats } from './libs/helpers/helpers.js';
import styles from './styles.module.scss';

type Properties = {
  className?: string;
};

const UserArticlesGenresStats: React.FC<Properties> = ({ className }) => {
  const dispatch = useAppDispatch();
  const { userArticlesGenresStats, userArticlesGenresStatsStatus } =
    useAppSelector(({ users }) => users);

  useEffect(() => {
    void dispatch(usersActions.getUserArticlesGenresStats());
  }, [dispatch]);

  const chartData = normalizeGenresStats(
    userArticlesGenresStats,
    GenresChartConfig.MAX_VISIBLE_GENRES,
  );

  return (
    <div className={getValidClassNames(styles.wrapper, className)}>
      <h3>Genres Stats</h3>
      <div className={styles.chartWrapper}>
        {userArticlesGenresStatsStatus === DataStatus.PENDING && (
          <Loader isLoading type="dots" />
        )}
        {userArticlesGenresStatsStatus === DataStatus.FULFILLED && (
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart
              width={GenresChartConfig.SIZE}
              height={GenresChartConfig.SIZE}
            >
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
                      GENRES_CHART_COLORS?.[index % GENRES_CHART_COLORS.length]
                    }
                  />
                ))}
              </Pie>
              <Legend layout="vertical" align="right" verticalAlign="middle" />
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export { UserArticlesGenresStats };
