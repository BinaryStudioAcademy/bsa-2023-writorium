import { NavLink } from 'react-router-dom';

import { type AppRoute, type LinkHash } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback } from '~/libs/hooks/hooks.js';
import { type ValueOf } from '~/libs/types/types.js';

import styles from './styles.module.scss';

type PathName = ValueOf<typeof AppRoute>;

type Path = {
  pathname: PathName;
  search: string;
  hash: ValueOf<typeof LinkHash>;
};

type Properties = {
  to: PathName | Partial<Path>;
  className?: string;
  activeClassName?: string;
  children: React.ReactNode;
};

const Link: React.FC<Properties> = ({
  children,
  className,
  activeClassName,
  to,
}) => {
  const handleGetClassesByLinkState = useCallback(
    ({ isActive }: { isActive: boolean }): string => {
      return getValidClassNames(
        styles.link,
        className,
        isActive && activeClassName,
      );
    },
    [className, activeClassName],
  );

  return (
    <NavLink to={to} className={handleGetClassesByLinkState} end>
      {children}
    </NavLink>
  );
};

export { Link };
