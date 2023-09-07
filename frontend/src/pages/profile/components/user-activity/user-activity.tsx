import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { type UserActivityResponseDto } from '~/packages/users/users.js';

import { ACTIVITY_BREAKPOINTS } from '../../libs/constants/constants.js';
import {
  getActivityBreakpoint,
  getUniqueMonths,
} from '../../libs/helpers/helpers.js';
import styles from './styles.module.scss';

type Properties = {
  userActivity: UserActivityResponseDto[];
};

const UserActivity: React.FC<Properties> = ({ userActivity }) => {
  const uniqueMonths: string[] = userActivity
    ? getUniqueMonths(userActivity)
    : [];

  const activityStatistic = userActivity.map((activity) => {
    const { count, date } = activity;
    const activityBreakpoint = getActivityBreakpoint(count);

    return (
      <span
        title={date}
        key={date}
        className={getValidClassNames(
          styles.activityItem,
          styles[activityBreakpoint],
        )}
      ></span>
    );
  });

  return (
    <>
      {Boolean(userActivity.length) && (
        <section>
          <h3 className={styles.title}>User writing activity graph</h3>
          <div className={styles.wrapper}>
            <div className={styles.days}>
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>
            <div>
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
                styles[ACTIVITY_BREAKPOINTS.breakpoint1],
              )}
            ></span>
            <span
              className={getValidClassNames(
                styles.breakpoint,
                styles[ACTIVITY_BREAKPOINTS.breakpoint2],
              )}
            ></span>
            <span
              className={getValidClassNames(
                styles.breakpoint,
                styles[ACTIVITY_BREAKPOINTS.breakpoint3],
              )}
            ></span>
            <span
              className={getValidClassNames(
                styles.breakpoint,
                styles[ACTIVITY_BREAKPOINTS.breakpoint4],
              )}
            ></span>
            More
          </div>
        </section>
      )}
    </>
  );
};

export { UserActivity };
