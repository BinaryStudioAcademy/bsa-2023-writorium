import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { type UserActivityResponseDto } from '~/packages/users/users.js';

import { getUniqueMonths } from '../../libs/helpers/helpers.js';
import styles from './styles.module.scss';

type Properties = {
  userActivity: UserActivityResponseDto;
};

const UserActivity: React.FC<Properties> = ({ userActivity }) => {
  const uniqueMonths: string[] = userActivity
    ? getUniqueMonths(userActivity)
    : [];

  const activityStatistic = userActivity.map((activity) => {
    const { count, date } = activity;
    let activityBreakpoint = '';

    switch (true) {
      case count === 0: {
        activityBreakpoint = 'breakpoint1';
        break;
      }
      case count === 1: {
        activityBreakpoint = 'breakpoint2';
        break;
      }
      case count > 1 && count < 5: {
        activityBreakpoint = 'breakpoint3';
        break;
      }
      case count >= 5: {
        activityBreakpoint = 'breakpoint4';
        break;
      }
    }

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
                styles.breakpoint1,
              )}
            ></span>
            <span
              className={getValidClassNames(
                styles.breakpoint,
                styles.breakpoint2,
              )}
            ></span>
            <span
              className={getValidClassNames(
                styles.breakpoint,
                styles.breakpoint3,
              )}
            ></span>
            <span
              className={getValidClassNames(
                styles.breakpoint,
                styles.breakpoint4,
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
