import { Button, ToggleCheckbox } from '~/libs/components/components.js';
import { ButtonType } from '~/libs/enums/enums.js';
import { useAppDispatch, useAppForm, useCallback } from '~/libs/hooks/hooks.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type ArticleRequestDto } from '~/packages/articles/articles.js';
import { type GenerateArticlePromptResponseDto as GeneratedPrompt } from '~/packages/prompts/prompts.js';
import { actions as articlesActions } from '~/slices/articles/articles.js';

import { type ArticleSubmitType } from '../article-form/libs/enums/enums.js';
import { DEFAULT_FORM_PAYLOAD } from './libs/constants/constants.js';
import { getConfirmedPrompts } from './libs/helpers/helpers.js';
import { type PromptConfirmationFormValues } from './libs/types/types.js';
import styles from './styles.module.scss';

type Properties = {
  submitData: {
    prompt: GeneratedPrompt;
    payload: ArticleRequestDto;
  };
  onSetSubmitType: (value: ValueOf<typeof ArticleSubmitType> | null) => void;
  submitType: ValueOf<typeof ArticleSubmitType> | null;
  isLoading: boolean;
};

const PromptConfirmationForm: React.FC<Properties> = ({
  submitData,
  onSetSubmitType,
  submitType,
  isLoading,
}) => {
  const dispatch = useAppDispatch();
  const { prompt, payload } = submitData;
  const { control, errors, handleSubmit } =
    useAppForm<PromptConfirmationFormValues>({
      defaultValues: DEFAULT_FORM_PAYLOAD,
    });

  const handleArticleSubmit = useCallback(
    (confirmedPrompt: PromptConfirmationFormValues) => {
      const payloadPrompt = getConfirmedPrompts(prompt, confirmedPrompt);

      onSetSubmitType(submitType);
      void dispatch(
        articlesActions.createArticle({
          articlePayload: payload,
          generatedPrompt: payloadPrompt,
        }),
      ).finally(() => {
        onSetSubmitType(null);
      });
    },
    [dispatch, onSetSubmitType, payload, prompt, submitType],
  );

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent<SubmitEvent>): void => {
      void handleSubmit(handleArticleSubmit)(event_);
    },
    [handleSubmit, handleArticleSubmit],
  );

  return (
    <div className={styles.formWrapper}>
      <form
        className={styles.innerWrapper}
        name="ConfirmPromptsForm"
        onSubmit={handleFormSubmit}
      >
        {Object.entries(prompt).map(([key, value]) => {
          const castedKey = key as keyof typeof prompt;
          if (castedKey === 'genre') {
            return;
          }
          return (
            <div className={styles.promptItem} key={self.crypto.randomUUID()}>
              <div className={styles.category}>
                <span className={styles.categoryText}>{key}</span>
              </div>
              <span className={styles.promptValue}>{value}</span>
              <div className={styles.checkBox}>
                <ToggleCheckbox
                  name={castedKey}
                  control={control}
                  errors={errors}
                  label=""
                />
              </div>
            </div>
          );
        })}
        <Button
          name="confirm"
          label="Confirm Prompts"
          isLoading={isLoading}
          type={ButtonType.SUBMIT}
          className={styles.promptsBtn}
        />
      </form>
    </div>
  );
};

export { PromptConfirmationForm };
