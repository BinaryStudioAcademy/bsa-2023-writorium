import { BlockWithTooltip, Tooltip } from '~/libs/components/components.js';
import { DataTooltipId } from '~/libs/enums/enums.js';

import { type TagType } from '../../libs/types/types.js';
import styles from './styles.module.scss';

type Properties = {
  tags: TagType[];
};

const Tags: React.FC<Properties> = ({ tags }) => (
  <ul className={styles.tags}>
    {tags.map((tag) => (
      <li key={crypto.randomUUID()} className={styles.container}>
        <div className={styles.category}>
          <span className={styles.categoryText}>{tag.category}</span>
        </div>
        <div className={styles.prompt}>
          <BlockWithTooltip
            tooltipContent={tag.text}
            placement="bottom"
            hasToShowTooltip={true}
          >
            <p className={styles.promptText}>{tag.text}</p>
          </BlockWithTooltip>
          <Tooltip
            id={DataTooltipId.PROMPT_TAG_TOOLTIP}
            className={styles.achievementTooltip}
          />
        </div>
      </li>
    ))}
  </ul>
);

export { Tags };
