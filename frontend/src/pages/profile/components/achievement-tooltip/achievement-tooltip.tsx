import { type FC } from 'react';
import { type ChildrenType } from 'react-tooltip';

import { ReactTooltip } from '~/libs/components/components.js';
import { DataTooltipId } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { PROGRESS_MIN } from '~/pages/profile/libs/constants/constants.js';

import styles from './styles.module.scss';

type render = (render: {
  content: string | null;
  activeAnchor: HTMLElement | null;
}) => ChildrenType;

const renderTooltip: render = ({ content, activeAnchor }) => (
  <div>
    <p>{content}</p>
    <p>
      Progress:{' '}
      {activeAnchor?.getAttribute('data-achievement-progress') || PROGRESS_MIN}%
    </p>
  </div>
);

const AchievementTooltip: FC = () => {
  return (
    <ReactTooltip
      render={renderTooltip}
      id={DataTooltipId.ACHIEVEMENT_TOOLTIP}
      className={getValidClassNames(styles.tooltip, styles.achievementTooltip)}
    />
  );
};

export { AchievementTooltip };
