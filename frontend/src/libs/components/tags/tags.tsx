import { BlockWithTooltip, Tooltip } from '~/libs/components/components.js';
import { DataTooltipId } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { type Tag } from '~/libs/types/types.js';

import { TOOLTIP_OFFSET } from './libs/constants/constants.js';
import styles from './styles.module.scss';

type Properties = {
  className?: string;
  tags: Tag[];
};

const Tags: React.FC<Properties> = ({ className, tags }) => (
  <ul
    className={getValidClassNames(
      styles.tags,
      className,
      tags.length === 1 && styles.singleTag,
    )}
  >
    {tags.map((tag) => (
      <li key={tag.category} className={styles.container}>
        <BlockWithTooltip
          tooltipContent={tag.text}
          placement="top"
          tooltipId={DataTooltipId.PROMPT_TAG_TOOLTIP}
        >
          <div className={styles.category}>
            <span className={styles.categoryText}>{tag.category}</span>
          </div>
          <div className={styles.prompt}>
            <p className={styles.promptText}>{tag.text}</p>
          </div>
        </BlockWithTooltip>
      </li>
    ))}
    <Tooltip
      id={DataTooltipId.PROMPT_TAG_TOOLTIP}
      className={styles.promptTagTooltip}
      offset={TOOLTIP_OFFSET}
    />
  </ul>
);

export { Tags };
