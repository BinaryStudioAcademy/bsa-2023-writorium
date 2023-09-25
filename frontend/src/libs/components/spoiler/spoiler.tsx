import { type WindowBreakpoint } from '~/libs/enums/enums.js';
import { checkIsPassingWindowBreakpoint } from '~/libs/helpers/helpers.js';
import { useGetWindowDimensions } from '~/libs/hooks/hooks.js';
import { type ValueOf } from '~/libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  children: React.ReactNode;
  breakpoint: ValueOf<typeof WindowBreakpoint>;
  summary: string;
};

const Spoiler: React.FC<Properties> = ({ children, breakpoint, summary }) => {
  const { width } = useGetWindowDimensions();
  const shouldUseSpoiler = checkIsPassingWindowBreakpoint(breakpoint, width);

  if (!shouldUseSpoiler) {
    return children;
  }

  return (
    <details className={styles.spoiler}>
      <summary>{summary}</summary>
      {children}
    </details>
  );
};

export { Spoiler };
