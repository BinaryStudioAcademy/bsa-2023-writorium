import { NavLink } from 'react-router-dom';

import { type AppRoute } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { type ValueOf } from '~/libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  to: ValueOf<typeof AppRoute>;
  className?: string;
  children: React.ReactNode;
};

const Link: React.FC<Properties> = ({ children, className, to }) => (
  <NavLink to={to} className={getValidClassNames(styles.link, className)}>
    {children}
  </NavLink>
);

export { Link };
