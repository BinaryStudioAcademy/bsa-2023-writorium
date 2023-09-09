import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { type UserActivityResponseDto } from '~/packages/users/users.js';

import { ActivityBreakpoints } from '../../libs/enums/enums.js';
import {
  getActivityBreakpoint,
  getUniqueMonths,
} from '../../libs/helpers/helpers.js';
import styles from './styles.module.scss';

type Properties = {
  userActivity: UserActivityResponseDto[];
};

const UserActivity: React.FC<Properties> = ({ userActivity }) => {
  const uniqueMonths: string[] = getUniqueMonths(userActivity);

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
        <section className={styles.wrapper}>
          <h3 className={styles.title}>User writing activity graph</h3>
          <div className={styles.activityWrapper}>
            <div className={styles.days}>
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
              <span>Sun</span>
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
                styles[ActivityBreakpoints.breakpoint1],
              )}
            ></span>
            <span
              className={getValidClassNames(
                styles.breakpoint,
                styles[ActivityBreakpoints.breakpoint2],
              )}
            ></span>
            <span
              className={getValidClassNames(
                styles.breakpoint,
                styles[ActivityBreakpoints.breakpoint3],
              )}
            ></span>
            <span
              className={getValidClassNames(
                styles.breakpoint,
                styles[ActivityBreakpoints.breakpoint4],
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
