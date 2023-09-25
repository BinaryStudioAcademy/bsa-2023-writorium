import { Button, Input, TextEditor } from '~/libs/components/components.js';
import { DataStatus } from '~/libs/enums/enums.js';
import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useCallback,
  useEffect,
  useNavigate,
  useState,
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
  const { generatedPrompt, saveArticleStatus } = useAppSelector(
    ({ prompts, articles }) => ({
      generatedPrompt: prompts.generatedPrompt,
      saveArticleStatus: articles.saveArticleStatus,
    }),
  );
  const [initialText, setInitialText] = useState(
    DEFAULT_ARTICLE_FORM_PAYLOAD.text,
  );
  const [isContentFromLocalStorage, setIsContentFromLocalStorage] =
    useState(false);
  const { control, errors, handleSubmit, handleReset, isDirty } =
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
  const [submitType, setSubmitType] = useState<ValueOf<
    typeof ArticleSubmitType
  > | null>(null);

  useEffect(() => {
    void (async (): Promise<void> => {
      if (articleForUpdate) {
        setInitialText(articleForUpdate.text);
      } else {
        const articleTitleFromLocalStorage =
          (await storage.get(StorageKey.ARTICLE_TITLE)) ??
          DEFAULT_ARTICLE_FORM_PAYLOAD.title;
        const articleTextFromLocalStorage =
          (await storage.get(StorageKey.ARTICLE_TEXT)) ??
          DEFAULT_ARTICLE_FORM_PAYLOAD.text;

        await storage.drop(StorageKey.ARTICLE_TEXT);
        await storage.drop(StorageKey.ARTICLE_TITLE);

        setInitialText(articleTextFromLocalStorage);
        setIsContentFromLocalStorage(true);

        handleReset({
          ...DEFAULT_ARTICLE_FORM_PAYLOAD,
          title: articleTitleFromLocalStorage,
          text: articleTextFromLocalStorage,
        });
      }
    })();
  }, [articleForUpdate, handleReset]);

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

        await storage.set(StorageKey.ARTICLE_TITLE, payload.title);
        await storage.set(StorageKey.ARTICLE_TEXT, payload.text);
        generatedPrompt &&
          (await storage.set(
            StorageKey.PROMPT,
            JSON.stringify(generatedPrompt),
          ));

        setSubmitType(articleSubmitType);
        void dispatch(
          articlesActions.createArticle({
            articlePayload: updatedPayload,
            generatedPrompt: getGeneratedPromptPayload(generatedPrompt),
          }),
        ).finally(() => {
          setSubmitType(null);
        });
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

        setSubmitType(articleSubmitType);
        void dispatch(articlesActions.updateArticle(updatePayload)).finally(
          () => {
            setSubmitType(null);
          },
        );
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
    if (!isDirty && !isContentFromLocalStorage) {
      navigate(PREVIOUS_PAGE_INDEX);
      return;
    }

    articleForUpdate
      ? setInitialText(articleForUpdate.text)
      : setInitialText(DEFAULT_ARTICLE_FORM_PAYLOAD.text);

    setIsContentFromLocalStorage(false);

    handleReset(
      articleForUpdate
        ? {
            text: articleForUpdate.text,
            title: articleForUpdate.title,
            coverId: articleForUpdate.coverId,
          }
        : DEFAULT_ARTICLE_FORM_PAYLOAD,
    );
  }, [
    handleReset,
    navigate,
    isDirty,
    articleForUpdate,
    isContentFromLocalStorage,
  ]);

  useEffect(() => {
    return () => {
      dispatch(promptActions.resetPrompts());
    };
  }, [dispatch]);

  const isSaveDraftLoading =
    submitType === ArticleSubmitType.DRAFT &&
    saveArticleStatus === DataStatus.PENDING;

  const isPublishLoading =
    submitType === ArticleSubmitType.PUBLISH &&
    saveArticleStatus === DataStatus.PENDING;

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
        initialValue={initialText}
      />
      <div className={styles.buttonWrapper}>
        <Button
          variant="outlined"
          type="reset"
          label="Cancel"
          className={styles.cancelBtn}
          disabled={isPublishLoading || isSaveDraftLoading}
        />
        <Button
          variant="outlined"
          type="submit"
          label="Save draft"
          name="draft"
          isLoading={isSaveDraftLoading}
          className={styles.saveDraftBtn}
          disabled={
            (!isDirty && !isContentFromLocalStorage) || isPublishLoading
          }
        />
        <Button
          name="publish"
          label="Publish"
          isLoading={isPublishLoading}
          type="submit"
          className={styles.publishBtn}
          disabled={(!isDirty && !isDraft) || isSaveDraftLoading}
        />
      </div>
    </form>
  );
};

export { ArticleForm };
