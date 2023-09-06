import { type FC } from 'react';

import { DataTooltipId } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { getProgressStyleClass } from '~/pages/profile/libs/helpers/helpers.js';
import { type UserAchievement } from '~/pages/profile/libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  achievement: UserAchievement;
  className?: string;
  showTooltip: boolean;
};

const Achievement: FC<Properties> = ({
  achievement,
  className,
  showTooltip = false,
}) => {
  const { name, progress, description } = achievement;

  const statusStyleClass = getProgressStyleClass(progress);
  const tooltipProperties = showTooltip
    ? {
        'data-tooltip-id': DataTooltipId.ACHIEVEMENT_TOOLTIP,
        'data-tooltip-content': description,
        'data-achievement-progress': progress,
      }
    : {};

  return (
    <div
      className={getValidClassNames(
        styles.achievementItem,
        className,
        styles[statusStyleClass],
      )}
      {...tooltipProperties}
    >
      <h4>{name}</h4>
    </div>
  );
};

export { Achievement };
