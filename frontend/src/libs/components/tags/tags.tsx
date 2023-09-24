import { BlockWithTooltip, Tooltip } from '~/libs/components/components.js';
import { DataTooltipId } from '~/libs/enums/enums.js';
import { type TagType } from '~/libs/types/types.js';

import { TOOLTIP_OFFSET } from './libs/constants/constants.js';
import styles from './styles.module.scss';

type Properties = {
  tags: TagType[];
};

const Tags: React.FC<Properties> = ({ tags }) => (
  <ul className={styles.tags}>
    {tags.map((tag) => (
      <li key={crypto.randomUUID()} className={styles.container}>
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
