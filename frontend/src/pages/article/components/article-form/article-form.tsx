import { Button, Input, TextEditor } from '~/libs/components/components.js';
import { DataStatus } from '~/libs/enums/enums.js';
import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useCallback,
  useEffect,
  useNavigate,
  useReference,
  useState,
} from '~/libs/hooks/hooks.js';
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

  const { generatedPrompt, saveArticleStatus, articleDataFromLocalStorage } =
    useAppSelector(({ prompts, articles }) => ({
      generatedPrompt: prompts.generatedPrompt,
      saveArticleStatus: articles.saveArticleStatus,
      articleDataFromLocalStorage: articles.articleDataFromLocalStorage,
      generatedPromptStatus: prompts.dataStatus,
    }));

  const [initialText, setInitialText] = useState(
    DEFAULT_ARTICLE_FORM_PAYLOAD.text,
  );
  const [isContentFromLocalStorage, setIsContentFromLocalStorage] =
    useState(false);

  const isClikedSubmitButtonReference = useReference(false);

  const { control, errors, handleSubmit, handleReset, isDirty, getValues } =
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

  const hadleInitialData = useCallback(() => {
    void dispatch(articlesActions.setArticleFormDataFromLocalStorage());
  }, [dispatch]);

  useEffect(() => {
    if (!articleForUpdate) {
      hadleInitialData();
    }
  }, [hadleInitialData, articleForUpdate]);

  useEffect(() => {
    ((): void => {
      if (articleForUpdate) {
        setInitialText(articleForUpdate.text);
      } else {
        const { title, text } = articleDataFromLocalStorage ?? {};

        if (title || text) {
          setIsContentFromLocalStorage(true);
        }

        setInitialText(text ?? '');

        handleReset({
          ...DEFAULT_ARTICLE_FORM_PAYLOAD,
          title: title ?? DEFAULT_ARTICLE_FORM_PAYLOAD.title,
          text: text ?? DEFAULT_ARTICLE_FORM_PAYLOAD.text,
        });
      }
    })();
  }, [articleForUpdate, handleReset, dispatch, articleDataFromLocalStorage]);

  const handleBeforeUnload = useCallback(
    (event_: BeforeUnloadEvent) => {
      if (isClikedSubmitButtonReference.current) {
        return;
      }
      event_.preventDefault();
      event_.returnValue = '';
    },
    [isClikedSubmitButtonReference],
  );

  useEffect(() => {
    if (!articleForUpdate) {
      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [handleBeforeUnload, articleForUpdate]);

  const isDraft = !articleForUpdate?.publishedAt;

  const handleArticleSubmit = useCallback(
    (articleSubmitType: ValueOf<typeof ArticleSubmitType>) =>
      (payload: ArticleRequestDto): void => {
        const isArticlePublished =
          articleSubmitType === ArticleSubmitType.PUBLISH;

        const updatedPayload = {
          ...payload,
          publishedAt: isArticlePublished ? new Date().toISOString() : null,
        };

        isClikedSubmitButtonReference.current = true;

        void dispatch(
          articlesActions.saveArticleFormDataToLocalStorage({
            articlePayload: {
              title: payload.title,
              text: payload.text,
            },
          }),
        );

        setSubmitType(articleSubmitType);
        void dispatch(
          articlesActions.createArticle({
            articlePayload: updatedPayload,
            generatedPrompt: getGeneratedPromptPayload(generatedPrompt),
          }),
        )
          .catch(() => {
            isClikedSubmitButtonReference.current = false;
          })
          .finally(() => {
            setSubmitType(null);
          });
      },
    [dispatch, generatedPrompt, isClikedSubmitButtonReference],
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

    handleReset(
      articleForUpdate
        ? {
            text: articleForUpdate.text,
            title: articleForUpdate.title,
            coverId: articleForUpdate.coverId,
          }
        : DEFAULT_ARTICLE_FORM_PAYLOAD,
    );

    if (!articleForUpdate) {
      void dispatch(articlesActions.dropArticleFormDataFromLocalStorage());
      setIsContentFromLocalStorage(false);
    }
  }, [
    handleReset,
    navigate,
    isDirty,
    articleForUpdate,
    isContentFromLocalStorage,
    dispatch,
  ]);

  const isSaveDraftLoading =
    submitType === ArticleSubmitType.DRAFT &&
    saveArticleStatus === DataStatus.PENDING;

  const isPublishLoading =
    submitType === ArticleSubmitType.PUBLISH &&
    saveArticleStatus === DataStatus.PENDING;

  useEffect(() => {
    return () => {
      if (!isClikedSubmitButtonReference.current && !articleForUpdate) {
        const { title, text } = getValues();

        void dispatch(
          articlesActions.saveArticleFormDataToLocalStorage({
            articlePayload: {
              title,
              text,
            },
            unmount: true,
          }),
        );
      }
    };
  }, [dispatch, getValues, isClikedSubmitButtonReference, articleForUpdate]);

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
