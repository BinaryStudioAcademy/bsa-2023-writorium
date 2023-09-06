import 'react-tooltip/dist/react-tooltip.css';

import { type FC } from 'react';

import { ReactTooltip } from '~/libs/components/components.js';

import styles from './styles.module.scss';

const Tooltip: FC = () => {
  return <ReactTooltip id="main-tooltip" className={styles.tooltip} />;
};

export { Tooltip };
