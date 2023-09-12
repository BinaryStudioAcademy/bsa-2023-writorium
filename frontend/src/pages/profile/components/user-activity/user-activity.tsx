import { DateFormat } from '~/libs/enums/enums.js';
import {
  getFormattedDate,
  getValidClassNames,
} from '~/libs/helpers/helpers.js';
import { type UserActivityResponseDto } from '~/packages/users/users.js';

import { DATE_LOCALE, DATE_OPTIONS } from '../../libs/constants/constants.js';
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
  const dateFormatter = new Intl.DateTimeFormat(DATE_LOCALE, DATE_OPTIONS);

  const activityStatistic = userActivity.map((activity, index) => {
    const { count, date } = activity;
    const activityBreakpoint = getActivityBreakpoint(count);
    const localDate = dateFormatter.format(new Date(date));
    const activityTitle = `${count} action${
      count > 1 ? 's' : ''
    } on ${localDate}`;

    return (
      <span
        title={activityTitle}
        key={localDate}
        className={getValidClassNames(
          styles.activityItem,
          styles[activityBreakpoint],
          index === 0 &&
            styles[
              getFormattedDate(localDate, DateFormat.DAY_OF_WEEK).toLowerCase()
            ],
        )}
      />
    );
  });

  return (
    <>
      {Boolean(userActivity.length) && (
        <section className={styles.wrapper}>
          <h3 className={styles.title}>Your writing activity</h3>
          <div className={styles.activityWrapper}>
            <div className={styles.days}>
              <span className={styles.monday}>Mon</span>
              <span className={styles.wednesday}>Wed</span>
              <span className={styles.friday}>Fri</span>
              <span className={styles.sunday}>Sun</span>
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
        </section>
      )}
    </>
  );
};

export { UserActivity };
