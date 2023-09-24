import { Button, IconButton } from '~/libs/components/components.js';
import { DataStatus } from '~/libs/enums/data-status.enum.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
} from '~/libs/hooks/hooks.js';
import { PromptCategory } from '~/packages/prompts/libs/enums/enums.js';
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
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      void dispatch(promptsActions.generatePrompt());
    },
    [dispatch],
  );

  const handleResetPrompt = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      dispatch(promptsActions.resetPrompts());
    },
    [dispatch],
  );

  return (
    <section className={getValidClassNames(styles.container, containerStyle)}>
      <div className={styles.promptsContainer}>
        <ul className={styles.prompts}>
          {Object.values(PromptCategory).map((category) => (
            <PromptCard
              key={category}
              category={category}
              text={generatedPrompt?.[category] ?? ''}
              isGenerating={isGenerating}
            />
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
