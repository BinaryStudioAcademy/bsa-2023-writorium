import { type ControllerRenderProps } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { ButtonType } from '~/libs/enums/enums.js';
import { useAppDispatch, useAppForm, useCallback } from '~/libs/hooks/hooks.js';
import { type ValueOf } from '~/libs/types/types.js';
import {
  articleCreateValidationSchema,
  type ArticleRequestDto,
} from '~/packages/articles/articles.js';
import { actions as articlesActions } from '~/slices/articles/articles.js';

import { Button, Input, TextEditor } from '../components.js';
import { DEFAULT_ARTICLE_FORM_PAYLOAD } from './libs/constants.js';
import { ArticleSubmitType } from './libs/enums/enums.js';
import styles from './styles.module.scss';

type TextEditorControlRenderProperties = ControllerRenderProps<
  ArticleRequestDto,
  'text'
>;

// TODO: Should be moved out from common components.
const ArticleForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { control, errors, handleSubmit, handleReset, isDirty, isSubmitting } =
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

  const renderTextEditorControl = useCallback(
    ({ field }: { field: TextEditorControlRenderProperties }) => {
      return <TextEditor content={field.value} onUpdate={field.onChange} />;
    },
    [],
  );

  const handleCancel = useCallback(() => {
    handleReset(DEFAULT_ARTICLE_FORM_PAYLOAD);
  }, [handleReset]);

  return (
    <div>
      <form
        method="POST"
        onSubmit={handleFormSubmit}
        onReset={handleCancel}
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
        <Controller
          name="text"
          control={control}
          render={renderTextEditorControl}
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
