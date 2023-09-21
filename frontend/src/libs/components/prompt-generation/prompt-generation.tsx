import { Button, Icon } from '~/libs/components/components.js';
import { DataStatus } from '~/libs/enums/data-status.enum.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useState,
} from '~/libs/hooks/hooks.js';
import { storage, StorageKey } from '~/libs/packages/storage/storage.js';
import { type GeneratedArticlePrompt } from '~/libs/types/types.js';
import { PromptCategory } from '~/packages/prompts/libs/enums/enums.js';
import { actions as promptsActions } from '~/slices/prompts/prompts.js';

import { PromptCard } from './libs/components/components.js';
import styles from './styles.module.scss';

const PromptGeneration: React.FC = () => {
  const { generatedPrompt, dataStatus } = useAppSelector(({ prompts }) => ({
    generatedPrompt: prompts.generatedPrompt,
    dataStatus: prompts.dataStatus,
  }));

  const [promptFromLocalStorage, setPromptFromLocalStorage] =
    useState(generatedPrompt);

  const isGenerating = dataStatus === DataStatus.PENDING;

  const dispatch = useAppDispatch();

  const handlePromptGenerate = useCallback(() => {
    void dispatch(promptsActions.generatePrompt());
  }, [dispatch]);

  const handleResetPrompt = useCallback(() => {
    dispatch(promptsActions.resetPrompts());
  }, [dispatch]);

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
    <section className={styles.container}>
      <h1 className={styles.header}>Write your own story</h1>
      <div className={styles.promptsContainer}>
        <ul className={styles.prompts}>
          {Object.values(PromptCategory).map((category) => (
            <PromptCard
              key={category}
              category={category}
              text={
                generatedPrompt?.[category] ??
                promptFromLocalStorage?.[category] ??
                ''
              }
              isGenerating={isGenerating}
            />
          ))}
          <Button
            label="Reset prompt"
            className={styles.resetPromptButton}
            onClick={handleResetPrompt}
          />
        </ul>
        <Button
          className={styles.shuffleButton}
          label={
            <Icon
              iconName="refresh"
              className={getValidClassNames(isGenerating && styles.spin)}
            />
          }
          onClick={handlePromptGenerate}
        />
      </div>
    </section>
  );
};

export { PromptGeneration };
