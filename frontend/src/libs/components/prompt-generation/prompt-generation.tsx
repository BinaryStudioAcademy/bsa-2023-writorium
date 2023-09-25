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
  useEffect,
  useState,
} from '~/libs/hooks/hooks.js';
import { storage, StorageKey } from '~/libs/packages/storage/storage.js';
import {
  type GeneratedArticlePrompt,
  type ReactMouseEvent,
} from '~/libs/types/types.js';
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

  const [promptFromLocalStorage, setPromptFromLocalStorage] =
    useState(generatedPrompt);

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

  useEffect(() => {
    void (async (): Promise<void> => {
      const promptFromLocalStorage =
        (await storage.get(StorageKey.PROMPT)) ?? null;

      await storage.drop(StorageKey.PROMPT);

      if (promptFromLocalStorage) {
        setPromptFromLocalStorage(
          JSON.parse(promptFromLocalStorage) as GeneratedArticlePrompt,
        );
      }
    })();
  }, [generatedPrompt]);

  return (
    <section className={getValidClassNames(styles.container, containerStyle)}>
      <div className={styles.promptsContainer}>
        <ul className={styles.prompts}>
          {Object.values(PromptCategory).map((category) => (
            <BlockWithTooltip
              tooltipContent={generatedPrompt?.[category] ?? ''}
              placement="top"
              tooltipId={DataTooltipId.MAIN_TOOLTIP}
              className={styles.minWidth}
              key={category}
            >
              <PromptCard
                category={category}
                text={
                  generatedPrompt?.[category] ??
                  promptFromLocalStorage?.[category] ??
                  ''
                }
                isGenerating={isGenerating}
              />
            </BlockWithTooltip>
          ))}
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
            disabled={!generatedPrompt}
            className={styles.resetPromptButton}
            onClick={handleResetPrompt}
          />
        </ul>
        <IconButton
          iconName="refresh"
          className={styles.shuffleButton}
          iconClassName={getValidClassNames(isGenerating && styles.spin)}
          onClick={handlePromptGenerate}
        />
      </div>
    </section>
  );
};

export { PromptGeneration };
