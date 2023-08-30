import { Button, Icon } from '~/libs/components/components.js';
import { DataStatus } from '~/libs/enums/data-status.enum.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
} from '~/libs/hooks/hooks.js';
import { actions as promptsActions } from '~/slices/prompts/prompts.js';

import { PromptCard } from './libs/components/components.js';
import { PromptCategory } from './libs/enums/enums.js';
import styles from './styles.module.scss';

const PromptGeneration: React.FC = () => {
  const { prompt, dataStatus } = useAppSelector(({ prompts }) => ({
    prompt: prompts.prompt,
    dataStatus: prompts.dataStatus,
  }));
  const isSpinning = !(
    dataStatus === DataStatus.FULFILLED || dataStatus == DataStatus.REJECTED
  );
  const dispatch = useAppDispatch();

  const promptCategories = Object.values(PromptCategory);

  const handlePromptGenerate = useCallback(() => {
    void dispatch(promptsActions.generatePrompt());
  }, [dispatch]);

  useEffect(() => {
    void dispatch(promptsActions.generatePrompt());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Write your own story</h1>
      <div className={styles.promptsContainer}>
        {promptCategories.map((category) => (
          <PromptCard
            key={category}
            category={category}
            text={prompt ? prompt[category] : ''}
          />
        ))}
        <Button
          className={styles.shuffleButton}
          label={
            <Icon
              iconName="refresh"
              className={getValidClassNames(isSpinning && styles.spin)}
            />
          }
          onClick={handlePromptGenerate}
        />
      </div>
    </div>
  );
};

export { PromptGeneration };
