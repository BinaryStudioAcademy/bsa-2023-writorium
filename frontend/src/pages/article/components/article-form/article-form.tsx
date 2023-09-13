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
  articleUpdateValidationSchema,
  type ArticleWithAuthorType,
} from '~/packages/articles/articles.js';
import { getGeneratedPromptPayload } from '~/packages/prompts/prompts.js';
import { actions as articlesActions } from '~/slices/articles/articles.js';

import { ArticleCoverUpload } from './libs/components/components.js';
import { DEFAULT_ARTICLE_FORM_PAYLOAD } from './libs/constants/constants.js';
import { ArticleSubmitType } from './libs/enums/enums.js';
import styles from './styles.module.scss';

type Properties = {
  articleForUpdate?: ArticleWithAuthorType;
};

const ArticleForm: React.FC<Properties> = ({ articleForUpdate }) => {
  const { generatedPrompt } = useAppSelector(({ prompts }) => ({
    generatedPrompt: prompts.generatedPrompt,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { control, errors, handleSubmit, handleReset, isDirty, isSubmitting } =
    useAppForm<ArticleRequestDto>({
      defaultValues: articleForUpdate
        ? {
            ...DEFAULT_ARTICLE_FORM_PAYLOAD,
            text: articleForUpdate.text,
            title: articleForUpdate.title,
          }
        : DEFAULT_ARTICLE_FORM_PAYLOAD,
      validationSchema: articleForUpdate
        ? articleUpdateValidationSchema
        : articleCreateValidationSchema,
    });

  const isDraft = !articleForUpdate?.publishedAt;

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

        void dispatch(
          articlesActions.createArticle({
            articlePayload: updatedPayload,
            generatedPrompt: getGeneratedPromptPayload(generatedPrompt),
          }),
        );
      },
    [dispatch, generatedPrompt],
  );

  const handleArticleUpdate = useCallback(
    (payload: ArticleRequestDto): void => {
      if (!articleForUpdate) {
        return;
      }

      const updatePayload = {
        articleId: articleForUpdate.id,
        articleForUpdate: {
          text: payload.text,
          title: payload.title,
          publishedAt: articleForUpdate.publishedAt ?? new Date().toISOString(),
        },
      };

      void dispatch(articlesActions.updateArticle(updatePayload))
        .unwrap()
        .then(() =>
          navigate(`${AppRoute.ARTICLES}/${ArticleSubRoute.MY_ARTICLES}`),
        )
        .catch(() => {});
    },

    [dispatch, articleForUpdate, navigate],
  );

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent<SubmitEvent>): void => {
      const button = event_.nativeEvent.submitter as HTMLButtonElement;

      void handleSubmit(
        articleForUpdate
          ? handleArticleUpdate
          : handleArticleSubmit(
              button.name as ValueOf<typeof ArticleSubmitType>,
            ),
      )(event_);
    },
    [handleSubmit, handleArticleSubmit, articleForUpdate, handleArticleUpdate],
  );

  const handleCancel = useCallback(() => {
    handleReset(
      articleForUpdate
        ? { text: articleForUpdate.text, title: articleForUpdate.title }
        : DEFAULT_ARTICLE_FORM_PAYLOAD,
    );
  }, [handleReset, articleForUpdate]);

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
          {!articleForUpdate && (
            <Button
              type={ButtonType.SUBMIT}
              label="Save draft"
              name="draft"
              className={styles.saveDraftBtn}
              disabled={!isDirty || isSubmitting}
            />
          )}
          <Button
            type={ButtonType.SUBMIT}
            label="Publish"
            name="publish"
            className={styles.publishBtn}
            disabled={(!isDirty && !isDraft) || isSubmitting}
          />
        </div>
      </form>
    </div>
  );
};

export { ArticleForm };
