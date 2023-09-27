import {
  BlockWithTooltip,
  Button,
  IconButton,
} from '~/libs/components/components.js';
import { DataStatus, DataTooltipId } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
} from '~/libs/hooks/hooks.js';
import { type ReactMouseEvent } from '~/libs/types/types.js';
import { PromptCategory } from '~/packages/prompts/prompts.js';
import { actions as promptsActions } from '~/slices/prompts/prompts.js';

import { PromptCard } from './libs/components/components.js';
import styles from './styles.module.scss';

type Properties = {
  containerStyle?: string;
};

const PromptGeneration: React.FC<Properties> = ({ containerStyle }) => {
  const { generatedPrompt, dataStatus } = useAppSelector(({ prompts }) => ({
    generatedPrompt: prompts.generatedPrompt,
    dataStatus: prompts.dataStatus,
  }));

  const isGenerating = dataStatus === DataStatus.PENDING;

  const dispatch = useAppDispatch();

  const handlePromptGenerate = useCallback(
    (event: ReactMouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      void dispatch(promptsActions.generatePrompt());
    },
    [dispatch],
  );

  const handleResetPrompt = useCallback(
    (event: ReactMouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      dispatch(promptsActions.resetPrompts());
    },
    [dispatch],
  );

  return (
    <div
      className={getValidClassNames(styles.promptsContainer, containerStyle)}
    >
      <ul className={styles.prompts}>
        {Object.values(PromptCategory).map((category) => (
          <BlockWithTooltip
            tooltipContent={generatedPrompt?.[category] ?? ''}
            placement="top"
            tooltipId={DataTooltipId.MAIN_TOOLTIP}
            className={styles.tooltipWrapper}
            key={category}
          >
            <PromptCard
              category={category}
              text={generatedPrompt?.[category] ?? ''}
              isGenerating={isGenerating}
            />
          </BlockWithTooltip>
        ))}
      </ul>
      <div className={styles.mobileActionButtons}>
        <Button
          size="small"
          className={styles.generatePromptButton}
          label="Generate prompt"
          onClick={handlePromptGenerate}
        />
        <Button
          size="small"
          label="Reset"
          variant="outlined"
          isDisabled={!generatedPrompt}
          className={styles.resetPromptButton}
          onClick={handleResetPrompt}
        />
      </div>
      <div className={styles.actionBar}>
        <div>
          <h2>Spark Your Imagination!</h2>
          <p className={styles.actionBarDescription}>
            Click the shuffle button to get a unique prompt that&apos;ll fuel
            your writing journey. Don&apos;t wait – your next masterpiece
            awaits!
          </p>
        </div>
        <IconButton
          iconName="refresh"
          className={styles.shuffleButton}
          iconClassName={getValidClassNames(isGenerating && styles.spin)}
          onClick={handlePromptGenerate}
        />
      </div>
    </div>
  );
};

export { PromptGeneration };
