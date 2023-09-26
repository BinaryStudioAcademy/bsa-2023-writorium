import { getValidClassNames } from '~/libs/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
  children: React.ReactNode;
  className?: string;
};

const Layout: React.FC<Properties> = ({ children, className }) => (
  <div className={getValidClassNames(className, styles.layout)}>{children}</div>
);

export { Layout };
