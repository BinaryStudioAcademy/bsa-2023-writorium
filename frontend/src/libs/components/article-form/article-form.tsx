import { ButtonType } from '~/libs/enums/enums.js';
import { useAppDispatch, useAppForm, useCallback } from '~/libs/hooks/hooks.js';
import { type ValueOf } from '~/libs/types/types.js';
import {
  articleCreateValidationSchema,
  type ArticleRequestDto,
} from '~/packages/articles/articles.js';
import { actions as articlesActions } from '~/slices/articles/articles.js';

import { Button, Input, Textarea } from '../components.js';
import { DEFAULT_ARTICLE_FORM_PAYLOAD } from './libs/constants.js';
import { ArticleSubmitType } from './libs/enums/enums.js';
import styles from './styles.module.scss';

// TODO: Should be moved out from common components.
const ArticleForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { control, errors, handleSubmit, reset, isDirty, isSubmitting } =
    useAppForm<ArticleRequestDto>({
      defaultValues: DEFAULT_ARTICLE_FORM_PAYLOAD,
      validationSchema: articleCreateValidationSchema,
    });

  const handleArticleSubmit = useCallback(
    (articleSubmitType: ValueOf<typeof ArticleSubmitType>) =>
      (payload: ArticleRequestDto): void => {
        const updatedPayload = {
          ...payload,
          publishedAt:
            articleSubmitType === ArticleSubmitType.PUBLISH
              ? new Date().toISOString()
              : null,
        };

        void dispatch(articlesActions.createArticle(updatedPayload));
      },
    [dispatch],
  );

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent<SubmitEvent>): void => {
      const button = event_.nativeEvent.submitter as HTMLButtonElement;
      void handleSubmit(
        handleArticleSubmit(button.name as ValueOf<typeof ArticleSubmitType>),
      )(event_);
    },
    [handleSubmit, handleArticleSubmit],
  );

  const handleCancelReset = useCallback((): void => {
    reset(DEFAULT_ARTICLE_FORM_PAYLOAD);
  }, [reset]);

  return (
    <div>
      <form
        method="POST"
        onSubmit={handleFormSubmit}
        onReset={handleCancelReset}
        className={styles.formContainer}
      >
        <Input
          type="text"
          placeholder="Enter the title of the article"
          name="title"
          control={control}
          errors={errors}
          className={styles.titleInput}
        />

        <Textarea
          name="text"
          placeholder="Write your post content"
          control={control}
          errors={errors}
          className={styles.postContentTextarea}
        />
        <div className={styles.buttonWrapper}>
          <Button
            type={ButtonType.RESET}
            label="Cancel"
            className={styles.cancelBtn}
          />
          <Button
            type={ButtonType.SUBMIT}
            label="Save draft"
            name="draft"
            className={styles.saveDraftBtn}
            disabled={!isDirty || isSubmitting}
          />
          <Button
            type={ButtonType.SUBMIT}
            label="Publish"
            name="publish"
            className={styles.publishBtn}
            disabled={!isDirty || isSubmitting}
          />
        </div>
      </form>
    </div>
  );
};

export { ArticleForm };
