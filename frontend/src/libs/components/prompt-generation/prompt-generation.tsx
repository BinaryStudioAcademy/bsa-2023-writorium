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

const PromptGeneration: React.FC = () => {
  const { prompt, dataStatus } = useAppSelector(({ prompts }) => ({
    prompt: prompts.prompt,
    dataStatus: prompts.dataStatus,
  }));

  const isSpinning = dataStatus === DataStatus.PENDING;

  const dispatch = useAppDispatch();

  const handlePromptGenerate = useCallback(() => {
    void dispatch(promptsActions.generatePrompt());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Write your own story</h1>
      <ul className={styles.promptsContainer}>
        {Object.values(PromptCategory).map((category) => (
          <PromptCard
            key={category}
            category={category}
            text={prompt?.[category] ?? ''}
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
      </ul>
    </div>
  );
};

export { PromptGeneration };