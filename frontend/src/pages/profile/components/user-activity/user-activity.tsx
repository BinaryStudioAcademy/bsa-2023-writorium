import { Loader } from '~/libs/components/components.js';
import { DataStatus, DateFormat } from '~/libs/enums/enums.js';
import {
  getFormattedDate,
  getValidClassNames,
  makePluralOrSingular,
} from '~/libs/helpers/helpers.js';
import { useAppSelector } from '~/libs/hooks/hooks.js';
import { type UserActivityResponseDto } from '~/packages/users/users.js';

import {
  getActivityBreakpoint,
  getUniqueMonths,
} from '../../libs/helpers/helpers.js';
import styles from './styles.module.scss';

type Properties = {
  userActivities: UserActivityResponseDto[];
  className?: string;
};

const UserActivity: React.FC<Properties> = ({ userActivities, className }) => {
  const { userActivitiesDataStatus } = useAppSelector(({ users }) => users);

  const uniqueMonths: string[] = getUniqueMonths(userActivities);

  const activityStatistic = userActivities.map((activity, index) => {
    const FIRST_ITEM_INDEX = 0;
    const { count, date } = activity;
    const activityBreakpoint = getActivityBreakpoint(count);
    const localDate = getFormattedDate(date, DateFormat.FULL_DATE);
    const activityTitle = `${count} ${makePluralOrSingular(
      'action',
      count,
    )} on ${localDate}`;

    return (
      <span
        title={activityTitle}
        key={localDate}
        className={getValidClassNames(
          styles.activityItem,
          styles[activityBreakpoint],
          index === FIRST_ITEM_INDEX &&
            styles[
              getFormattedDate(localDate, DateFormat.DAY_OF_WEEK).toLowerCase()
            ],
        )}
      />
    );
  });

  const isLoading = userActivitiesDataStatus === DataStatus.PENDING;

  return (
    <div className={styles.activityContainer}>
      <h3 className={styles.title}>Your writing activity</h3>
      <section className={getValidClassNames(styles.wrapper, className)}>
        <Loader isLoading={isLoading} type="dots">
          <div className={styles.activityWrapper}>
            <div className={styles.days}>
              <span className={styles.monday}>Mon</span>
              <span className={styles.wednesday}>Wed</span>
              <span className={styles.friday}>Fri</span>
              <span className={styles.sunday}>Sun</span>
            </div>
            <div className={styles.innerWrapper}>
              <div className={styles.months}>
                {uniqueMonths.map((month) => (
                  <span key={month}>{month}</span>
                ))}
              </div>
              <div className={styles.activity}>{activityStatistic}</div>
            </div>
          </div>
          <div className={styles.breakpoints}>
            Less
            <span
              className={getValidClassNames(
                styles.breakpoint,
                styles.firstBreakpoint,
              )}
            />
            <span
              className={getValidClassNames(
                styles.breakpoint,
                styles.secondBreakpoint,
              )}
            />
            <span
              className={getValidClassNames(
                styles.breakpoint,
                styles.thirdBreakpoint,
              )}
            />
            <span
              className={getValidClassNames(
                styles.breakpoint,
                styles.fourthBreakpoint,
              )}
            />
            More
          </div>
        </Loader>
      </section>
    </div>
  );
};

export { UserActivity };
