import { Button, Input, TextEditor } from '~/libs/components/components.js';
import { ButtonType } from '~/libs/enums/enums.js';
import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useCallback,
  useEffect,
  useNavigate,
} from '~/libs/hooks/hooks.js';
import { storage, StorageKey } from '~/libs/packages/storage/storage.js';
import { type ValueOf } from '~/libs/types/types.js';
import {
  articleCreateValidationSchema,
  type ArticleRequestDto,
  type ArticleResponseDto,
  articleUpdateValidationSchema,
} from '~/packages/articles/articles.js';
import { getGeneratedPromptPayload } from '~/packages/prompts/prompts.js';
import { actions as articlesActions } from '~/slices/articles/articles.js';
import { actions as promptActions } from '~/slices/prompts/prompts.js';

import { ArticleCoverUpload } from './libs/components/components.js';
import {
  DEFAULT_ARTICLE_FORM_PAYLOAD,
  PREVIOUS_PAGE_INDEX,
} from './libs/constants/constants.js';
import { ArticleSubmitType } from './libs/enums/enums.js';
import styles from './styles.module.scss';

type Properties = {
  articleForUpdate?: ArticleResponseDto;
};

const ArticleForm: React.FC<Properties> = ({ articleForUpdate }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { generatedPrompt } = useAppSelector(({ prompts }) => ({
    generatedPrompt: prompts.generatedPrompt,
  }));

  useEffect(() => {
    const getUnsavedArticleFromLocalStorage = async (): Promise<void> => {
      const unsavedArticleTitle =
        (await storage.get(StorageKey.ARTICLE_TITLE)) ?? '';
      const unsavedArticleText =
        (await storage.get(StorageKey.ARTICLE_TEXT)) ?? '';

      DEFAULT_ARTICLE_FORM_PAYLOAD.title = unsavedArticleTitle;
      DEFAULT_ARTICLE_FORM_PAYLOAD.text = unsavedArticleText;
    };
    void getUnsavedArticleFromLocalStorage();
  }, []);

  const { control, errors, handleSubmit, handleReset, isDirty, isSubmitting } =
    useAppForm<ArticleRequestDto>({
      defaultValues: articleForUpdate
        ? {
            ...DEFAULT_ARTICLE_FORM_PAYLOAD,
            coverId: articleForUpdate.coverId,
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
      async (payload: ArticleRequestDto): Promise<Promise<void>> => {
        const isArticlePublished =
          articleSubmitType === ArticleSubmitType.PUBLISH;

        const updatedPayload = {
          ...payload,
          publishedAt: isArticlePublished ? new Date().toISOString() : null,
        };

        const generatedPromptPayload =
          getGeneratedPromptPayload(generatedPrompt);

        await storage.set(StorageKey.ARTICLE_TITLE, payload.title);
        await storage.set(StorageKey.ARTICLE_TEXT, payload.text);
        generatedPromptPayload &&
          (await storage.set(
            StorageKey.PROMPTS,
            JSON.stringify(generatedPromptPayload),
          ));

        void dispatch(
          articlesActions.createArticle({
            articlePayload: updatedPayload,
            generatedPrompt: generatedPromptPayload,
          }),
        );
      },
    [dispatch, generatedPrompt],
  );

  const handleArticleUpdate = useCallback(
    (articleSubmitType: ValueOf<typeof ArticleSubmitType>) =>
      (payload: ArticleRequestDto): void => {
        if (!articleForUpdate) {
          return;
        }
        const isArticleDrafted = articleSubmitType === ArticleSubmitType.DRAFT;

        const updatePayload = {
          articleId: articleForUpdate.id,
          articleForUpdate: {
            text: payload.text,
            title: payload.title,
            publishedAt: isArticleDrafted
              ? null
              : articleForUpdate.publishedAt ?? new Date().toISOString(),
            coverId: payload.coverId,
          },
        };

        void dispatch(articlesActions.updateArticle(updatePayload));
      },

    [dispatch, articleForUpdate],
  );

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent<SubmitEvent>): void => {
      const button = event_.nativeEvent.submitter as HTMLButtonElement;
      const submitType = button.name as ValueOf<typeof ArticleSubmitType>;

      if (articleForUpdate) {
        void handleSubmit(handleArticleUpdate(submitType))(event_);
        return;
      }

      void handleSubmit(handleArticleSubmit(submitType))(event_);
    },
    [handleSubmit, handleArticleSubmit, articleForUpdate, handleArticleUpdate],
  );

  const handleCancel = useCallback(() => {
    if (!isDirty) {
      navigate(PREVIOUS_PAGE_INDEX);
      return;
    }

    handleReset(
      articleForUpdate
        ? {
            text: articleForUpdate.text,
            title: articleForUpdate.title,
            coverId: articleForUpdate.coverId,
          }
        : DEFAULT_ARTICLE_FORM_PAYLOAD,
    );
  }, [handleReset, navigate, isDirty, articleForUpdate]);

  useEffect(() => {
    return () => {
      dispatch(promptActions.resetPrompts());
    };
  }, [dispatch]);

  return (
    <form
      method="POST"
      onSubmit={handleFormSubmit}
      onReset={handleCancel}
      className={styles.formContainer}
    >
      <ArticleCoverUpload
        name="coverId"
        control={control}
        errors={errors}
        initialPreviewUrl={articleForUpdate?.coverUrl}
      />
      <Input
        type="text"
        placeholder="Enter the title of the article"
        name="title"
        control={control}
        errors={errors}
        className={styles.titleInput}
      />
      <TextEditor
        control={control}
        name="text"
        errors={errors}
        wasEdited={isDirty}
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
          disabled={(!isDirty && !isDraft) || isSubmitting}
        />
      </div>
    </form>
  );
};

export { ArticleForm };
