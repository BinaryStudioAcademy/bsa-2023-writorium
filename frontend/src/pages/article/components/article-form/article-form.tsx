import { Button, Input, TextEditor } from '~/libs/components/components.js';
import { AppRoute, ArticleSubRoute, ButtonType } from '~/libs/enums/enums.js';
import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useCallback,
  useNavigate,
} from '~/libs/hooks/hooks.js';
import { type ValueOf } from '~/libs/types/types.js';
import {
  articleCreateValidationSchema,
  type ArticleRequestDto,
} from '~/packages/articles/articles.js';
import { getGeneratedPromptPayload } from '~/packages/prompts/prompts.js';
import { actions as articlesActions } from '~/slices/articles/articles.js';

import { ArticleCoverUpload } from './libs/components/components.js';
import { DEFAULT_ARTICLE_FORM_PAYLOAD } from './libs/constants/constants.js';
import { ArticleSubmitType } from './libs/enums/enums.js';
import styles from './styles.module.scss';

const ArticleForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { generatedPrompt } = useAppSelector(({ prompts }) => ({
    generatedPrompt: prompts.generatedPrompt,
  }));
  const { control, errors, handleSubmit, handleReset, isDirty, isSubmitting } =
    useAppForm<ArticleRequestDto>({
      defaultValues: DEFAULT_ARTICLE_FORM_PAYLOAD,
      validationSchema: articleCreateValidationSchema,
    });

  const handleArticleSubmit = useCallback(
    (articleSubmitType: ValueOf<typeof ArticleSubmitType>) =>
      (payload: ArticleRequestDto): void => {
        const isArticlePublish =
          articleSubmitType === ArticleSubmitType.PUBLISH;

        const updatedPayload = {
          ...payload,
          publishedAt: isArticlePublish ? new Date().toISOString() : null,
        };

        void dispatch(
          articlesActions.createArticle({
            articlePayload: updatedPayload,
            generatedPrompt: getGeneratedPromptPayload(generatedPrompt),
          }),
        )
          .unwrap()
          .then(() => {
            navigate(
              isArticlePublish
                ? AppRoute.ARTICLES
                : `${AppRoute.ARTICLES}/${ArticleSubRoute.MY_ARTICLES}`,
            );
          });
      },
    [dispatch, generatedPrompt, navigate],
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
        <ArticleCoverUpload name="coverId" control={control} errors={errors} />
        <Input
          type="text"
          placeholder="Enter the title of the article"
          name="title"
          control={control}
          errors={errors}
          className={styles.titleInput}
        />
        <TextEditor control={control} name="text" errors={errors} />
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
