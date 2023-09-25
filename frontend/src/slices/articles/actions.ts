import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { PREVIOUS_PAGE_INDEX } from '~/libs/constants/constants.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { getFullName } from '~/libs/helpers/helpers.js';
import { StorageKey } from '~/libs/packages/storage/storage.js';
import {
  type AsyncThunkConfig,
  type GeneratedArticlePrompt,
} from '~/libs/types/types.js';
import {
  type ArticleGetAllResponseDto,
  type ArticleImprovementSuggestion,
  type ArticleReactionRequestDto,
  type ArticleReactionResponseDto,
  type ArticleReactionsSocketEvent,
  type ArticleReactionsSocketEventPayload,
  type ArticleRequestDto,
  type ArticlesFilters,
  type ArticleSocketEvent,
  type ArticleSocketEventPayload,
  type ArticleUpdateRequestPayload,
  type ArticleWithCountsResponseDto,
  type ArticleWithFollowResponseDto,
  type ReactionResponseDto,
} from '~/packages/articles/articles.js';
import {
  type CommentBaseRequestDto,
  type CommentGetAllResponseDto,
  type CommentsSocketEvent,
  type CommentsSocketEventPayload,
  type CommentUpdateDto,
  type CommentWithRelationsResponseDto,
} from '~/packages/comments/comments.js';
import { type GenreGetAllResponseDto } from '~/packages/genres/genres.js';
import { type PromptRequestDto } from '~/packages/prompts/prompts.js';
import { type UserFollowResponseDto } from '~/packages/users/users.js';

import { actions as appActions } from '../app/app.js';
import { actions as promptActions } from '../prompts/prompts.js';
import { name as sliceName } from './articles.slice.js';
import { parseImprovementSuggestionsJSON } from './libs/helpers/helpers.js';

const fetchAll = createAsyncThunk<
  ArticleGetAllResponseDto,
  ArticlesFilters,
  AsyncThunkConfig
>(`${sliceName}/get-all`, (filters, { extra }) => {
  const { articleApi } = extra;

  return articleApi.getAll(filters);
});

const fetchOwn = createAsyncThunk<
  ArticleGetAllResponseDto,
  ArticlesFilters,
  AsyncThunkConfig
>(`${sliceName}/get-own`, (filters, { extra }) => {
  const { articleApi } = extra;

  return articleApi.getOwn(filters);
});

const addArticle = createAsyncThunk<
  ArticleSocketEventPayload[typeof ArticleSocketEvent.NEW_ARTICLE] | null,
  ArticleSocketEventPayload[typeof ArticleSocketEvent.NEW_ARTICLE],
  AsyncThunkConfig
>(`${sliceName}/add-article`, (article, { getState, dispatch }) => {
  const {
    auth: { user },
  } = getState();

  if (user?.id !== article.userId) {
    const { author } = article;

    void dispatch(
      appActions.notify({
        type: 'info',
        message: `New article from ${getFullName(
          author.firstName,
          author.lastName,
        )}`,
      }),
    );

    return article;
  }

  return null;
});

const createArticle = createAsyncThunk<
  ArticleWithCountsResponseDto,
  {
    articlePayload: ArticleRequestDto;
    generatedPrompt: PromptRequestDto | null;
  },
  AsyncThunkConfig
>(
  `${sliceName}/create`,
  async ({ articlePayload, generatedPrompt }, { extra, dispatch }) => {
    const { articleApi, promptApi } = extra;

    if (generatedPrompt) {
      const { id: promptId, genreId } = await promptApi.create(generatedPrompt);

      const createdArticle = await articleApi.create({
        ...articlePayload,
        genreId,
        promptId,
      });

      void dispatch(dropArticleFormDataFromLocalStorage());

      return createdArticle;
    }

    const createdArticle = await articleApi.create(articlePayload);

    void dispatch(dropArticleFormDataFromLocalStorage());

    const wasPublished = Boolean(createdArticle.publishedAt);
    const routeToNavigate = wasPublished
      ? AppRoute.ARTICLES
      : AppRoute.ARTICLES_MY_ARTICLES;

    dispatch(appActions.navigate(routeToNavigate));

    return createdArticle;
  },
);

const updateArticle = createAsyncThunk<
  ArticleWithCountsResponseDto,
  ArticleUpdateRequestPayload,
  AsyncThunkConfig
>(`${sliceName}/update`, async (payload, { extra, dispatch }) => {
  const { articleApi, sessionStorage } = extra;

  const updatedArticle = await articleApi.update(payload);

  const existingSuggestionsJSON = await sessionStorage.get(
    StorageKey.ARTICLES_IMPROVEMENT_SUGGESTIONS,
  );

  const existingSuggestionsByArticles = parseImprovementSuggestionsJSON(
    existingSuggestionsJSON,
  );

  await sessionStorage.set(
    StorageKey.ARTICLES_IMPROVEMENT_SUGGESTIONS,
    JSON.stringify({
      ...existingSuggestionsByArticles,
      [payload.articleId]: null,
    }),
  );

  const wasPublished = Boolean(updatedArticle.publishedAt);
  const routeToNavigate = wasPublished
    ? AppRoute.ARTICLES
    : AppRoute.ARTICLES_MY_ARTICLES;

  dispatch(appActions.navigate(routeToNavigate));

  return updatedArticle;
});

const getArticle = createAsyncThunk<
  ArticleWithFollowResponseDto,
  number,
  AsyncThunkConfig
>(`${sliceName}/getArticle`, (id, { extra }) => {
  const { articleApi } = extra;

  return articleApi.getArticle(id);
});

const getAllGenres = createAsyncThunk<
  GenreGetAllResponseDto,
  undefined,
  AsyncThunkConfig
>(`${sliceName}/getAllGenres`, async (_loginPayload, { extra }) => {
  const { genresApi } = extra;
  return await genresApi.getAll();
});

const shareArticle = createAsyncThunk<
  { link: string },
  { id: string },
  AsyncThunkConfig
>(`${sliceName}/share`, async (articlePayload, { dispatch, extra }) => {
  const { articleApi } = extra;

  const response = await articleApi.share(articlePayload.id);

  void dispatch(
    appActions.notify({
      type: 'success',
      message: 'The sharing link was copied to clipboard',
    }),
  );

  return response;
});

const fetchSharedArticle = createAsyncThunk<
  ArticleWithFollowResponseDto,
  { token: string },
  AsyncThunkConfig
>(`${sliceName}/shared`, (articlePayload, { extra }) => {
  const { articleApi } = extra;

  return articleApi.getByToken(articlePayload.token);
});

const geArticleIdByToken = createAsyncThunk<
  Pick<ArticleWithFollowResponseDto, 'id'>,
  { token: string },
  AsyncThunkConfig
>(`${sliceName}/article-id-by-token`, (articlePayload, { extra }) => {
  const { articleApi } = extra;

  return articleApi.geArticleIdByToken(articlePayload.token);
});

const reactToArticle = createAsyncThunk<
  {
    articleId: number;
    reaction: ReactionResponseDto;
  },
  ArticleReactionRequestDto,
  AsyncThunkConfig
>(`${sliceName}/reactToArticle`, async (payload, { extra }) => {
  const { articleApi } = extra;
  const { articleId, ...reaction } = await articleApi.updateArticleReaction(
    payload,
  );

  return {
    articleId,
    reaction,
  };
});

const addReactionToArticleView = createAsyncThunk<
  ArticleReactionResponseDto | null,
  ArticleReactionsSocketEventPayload[typeof ArticleReactionsSocketEvent.NEW_REACTION],
  AsyncThunkConfig
>(`${sliceName}/add-reaction-to-article-view`, (reaction, { getState }) => {
  const {
    auth: { user },
  } = getState();

  if (user?.id !== reaction.userId) {
    return reaction;
  }

  return null;
});

const addReactionToArticlesFeed = createAsyncThunk<
  ArticleReactionResponseDto | null,
  ArticleReactionsSocketEventPayload[typeof ArticleReactionsSocketEvent.NEW_REACTION],
  AsyncThunkConfig
>(`${sliceName}/add-reaction-to-articles-feed`, (reaction, { getState }) => {
  const {
    auth: { user },
  } = getState();

  if (user?.id !== reaction.userId) {
    return reaction;
  }

  return null;
});

const deleteArticleReaction = createAsyncThunk<
  {
    articleId: number;
    reactionId: number;
  },
  ArticleReactionRequestDto,
  AsyncThunkConfig
>(`${sliceName}/deleteArticleReaction`, async (payload, { extra }) => {
  const { articleApi } = extra;
  const { articleId, id } = await articleApi.updateArticleReaction(payload);

  return {
    articleId,
    reactionId: id,
  };
});

const fetchAllCommentsToArticle = createAsyncThunk<
  CommentGetAllResponseDto,
  number,
  AsyncThunkConfig
>(`${sliceName}/get-all-comments-to-article`, (articleId, { extra }) => {
  const { commentsApi } = extra;

  return commentsApi.fetchAllByArticleId(articleId);
});

const addComment = createAsyncThunk<
  CommentsSocketEventPayload[typeof CommentsSocketEvent.NEW_COMMENT] | null,
  CommentsSocketEventPayload[typeof CommentsSocketEvent.NEW_COMMENT],
  AsyncThunkConfig
>(`${sliceName}/add-comment`, (comment, { getState, dispatch }) => {
  const {
    auth: { user },
  } = getState();

  if (user?.id !== comment.userId) {
    const { author } = comment;

    void dispatch(
      appActions.notify({
        type: 'info',
        message: `New comment from ${getFullName(
          author.firstName,
          author.lastName,
        )}`,
      }),
    );

    return comment;
  }

  return null;
});

const createComment = createAsyncThunk<
  CommentWithRelationsResponseDto,
  CommentBaseRequestDto,
  AsyncThunkConfig
>(`${sliceName}/create-comment`, (payload, { extra }) => {
  const { commentsApi } = extra;

  return commentsApi.create(payload);
});

const updateComment = createAsyncThunk<
  CommentWithRelationsResponseDto,
  CommentUpdateDto,
  AsyncThunkConfig
>(`${sliceName}/update-comment`, (payload, { extra }) => {
  const { commentsApi } = extra;

  return commentsApi.update(payload);
});

const deleteArticle = createAsyncThunk<
  ArticleWithCountsResponseDto,
  { id: number; hasRedirect?: boolean },
  AsyncThunkConfig
>(
  `${sliceName}/delete`,
  async ({ id, hasRedirect = false }, { extra, dispatch }) => {
    const { articleApi } = extra;

    const deletedArticle = await articleApi.delete(id);

    if (hasRedirect) {
      dispatch(appActions.navigate(PREVIOUS_PAGE_INDEX));
    }

    void dispatch(
      appActions.notify({
        type: 'success',
        message: 'The article has been deleted successfully.',
      }),
    );

    return deletedArticle;
  },
);

const getImprovementSuggestionsBySession = createAsyncThunk<
  ArticleImprovementSuggestion[] | null,
  number,
  AsyncThunkConfig
>(
  `${sliceName}/get-improvement-suggestions-by-session`,
  async (id, { extra }) => {
    const { sessionStorage } = extra;
    const suggestionsJSON = await sessionStorage.get(
      StorageKey.ARTICLES_IMPROVEMENT_SUGGESTIONS,
    );

    const existingSuggestionsByArticles =
      parseImprovementSuggestionsJSON(suggestionsJSON);

    if (existingSuggestionsByArticles[id]) {
      return existingSuggestionsByArticles[id];
    }

    return null;
  },
);

const getImprovementSuggestions = createAsyncThunk<
  ArticleImprovementSuggestion[],
  number,
  AsyncThunkConfig
>(`${sliceName}/get-improvement-suggestions`, async (id, { extra }) => {
  const { articleApi, sessionStorage } = extra;

  const newSuggestions = await articleApi.getImprovementSuggestions(id);

  const existingSuggestionsJSON = await sessionStorage.get(
    StorageKey.ARTICLES_IMPROVEMENT_SUGGESTIONS,
  );

  const existingSuggestionsByArticles = parseImprovementSuggestionsJSON(
    existingSuggestionsJSON,
  );

  await sessionStorage.set(
    StorageKey.ARTICLES_IMPROVEMENT_SUGGESTIONS,
    JSON.stringify({
      ...existingSuggestionsByArticles,
      [id]: newSuggestions.items,
    }),
  );

  return newSuggestions.items;
});

const toggleIsFavourite = createAsyncThunk<
  ArticleWithCountsResponseDto,
  number,
  AsyncThunkConfig
>(`${sliceName}/toggleIsFavourite`, (id, { extra }) => {
  const { articleApi } = extra;

  return articleApi.toggleIsFavourite(id);
});

const setShowFavourites = createAction<boolean>(
  `${sliceName}/toggleIsFavourite`,
);

const updateArticleAuthorFollowInfo = createAction<UserFollowResponseDto>(
  `${sliceName}/update-article-author-follow-info`,
);

const saveArticleFormDataToLocalStorage = createAsyncThunk<
  null,
  {
    articlePayload: Pick<ArticleRequestDto, 'text' | 'title'>;
    unmount?: boolean;
  },
  AsyncThunkConfig
>(
  `${sliceName}/saveArticleFormPageDataToLocalStorage`,
  async ({ articlePayload, unmount }, { extra, getState }) => {
    const { storage } = extra;
    const {
      prompts: { generatedPrompt },
    } = getState();
    let shouldStore = true;

    if (!articlePayload.title && !articlePayload.text && !generatedPrompt) {
      return null;
    }

    if (unmount) {
      shouldStore = confirm('There are unsaved changes. Save before leaving?');
    }

    if (shouldStore) {
      await storage.set(StorageKey.ARTICLE_TITLE, articlePayload.title);
      await storage.set(StorageKey.ARTICLE_TEXT, articlePayload.text);
      generatedPrompt &&
        (await storage.set(StorageKey.PROMPT, JSON.stringify(generatedPrompt)));
    }

    return null;
  },
);

const setArticleFormDataFromLocalStorage = createAsyncThunk<
  {
    title: string | null;
    text: string | null;
    prompt: string | null;
  },
  undefined,
  AsyncThunkConfig
>(
  `${sliceName}/getArticleFormPageDataFromLocalStorage`,
  async (_payload, { extra, dispatch }) => {
    const { storage } = extra;

    const title = await storage.get(StorageKey.ARTICLE_TITLE);
    const text = await storage.get(StorageKey.ARTICLE_TEXT);
    const prompt = await storage.get(StorageKey.PROMPT);

    if (prompt) {
      void dispatch(
        promptActions.setPromptFromLocalStorage(
          JSON.parse(prompt) as GeneratedArticlePrompt,
        ),
      );
    }

    void dispatch(dropArticleFormDataFromLocalStorage());

    return {
      title,
      text,
      prompt,
    };
  },
);

const dropArticleFormDataFromLocalStorage = createAsyncThunk<
  null,
  undefined,
  AsyncThunkConfig
>(
  `${sliceName}/dropArticleFormPageDataFromLocalStorage`,
  async (_payload, { extra }) => {
    const { storage } = extra;

    await storage.drop(StorageKey.ARTICLE_TITLE);
    await storage.drop(StorageKey.ARTICLE_TEXT);
    await storage.drop(StorageKey.PROMPT);

    return null;
  },
);

export {
  addArticle,
  addComment,
  addReactionToArticlesFeed,
  addReactionToArticleView,
  createArticle,
  createComment,
  deleteArticle,
  deleteArticleReaction,
  dropArticleFormDataFromLocalStorage,
  fetchAll,
  fetchAllCommentsToArticle,
  fetchOwn,
  fetchSharedArticle,
  geArticleIdByToken,
  getAllGenres,
  getArticle,
  getImprovementSuggestions,
  getImprovementSuggestionsBySession,
  reactToArticle,
  saveArticleFormDataToLocalStorage,
  setArticleFormDataFromLocalStorage,
  setShowFavourites,
  shareArticle,
  toggleIsFavourite,
  updateArticle,
  updateArticleAuthorFollowInfo,
  updateComment,
};
