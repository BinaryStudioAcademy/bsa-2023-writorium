import { Button, Icon } from '~/libs/components/components.js';
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

  const handlePromptGenerate = useCallback(() => {
    void dispatch(promptsActions.generatePrompt());
  }, [dispatch]);

  const handleResetPrompt = useCallback(() => {
    dispatch(promptsActions.resetPrompts());
  }, [dispatch]);

  return (
    <section className={getValidClassNames(styles.container, containerStyle)}>
      <div className={styles.promptsContainer}>
        <ul className={styles.prompts}>
          {/* <div className={styles.buttonsWrapper}>
                <Button
                // className={styles.shuffleButton}
                label="Generate prompt"
                onClick={handlePromptGenerate}
              />
              <Button
                label="Reset prompt"
                // className={styles.resetPromptButton}
                onClick={handleResetPrompt}
              />
            </div> */}
          {/* <Button
                className={styles.generatePromptButton}
                label="Generate prompt"
                onClick={handlePromptGenerate}
              /> */}
          {Object.values(PromptCategory).map((category) => (
            <PromptCard
              key={category}
              category={category}
              text={generatedPrompt?.[category] ?? ''}
              isGenerating={isGenerating}
            />
          ))}
          <Button
            className={styles.generatePromptButton}
            label="Generate prompt"
            onClick={handlePromptGenerate}
          />
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
