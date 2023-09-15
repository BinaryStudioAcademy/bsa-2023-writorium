import { createAsyncThunk } from '@reduxjs/toolkit';

import { StorageKey } from '~/libs/packages/storage/storage.js';
import { type AsyncThunkConfig } from '~/libs/types/types.js';
import {
  type ArticleGetAllResponseDto,
  type ArticleImprovementSuggestion,
  type ArticleReactionRequestDto,
  type ArticleRequestDto,
  type ArticleResponseDto,
  type ArticlesFilters,
  type ArticleUpdateRequestPayload,
  type ArticleWithCommentCountResponseDto,
  type ReactionResponseDto,
} from '~/packages/articles/articles.js';
import {
  type CommentBaseRequestDto,
  type CommentGetAllResponseDto,
  type CommentUpdateDto,
  type CommentWithRelationsResponseDto,
} from '~/packages/comments/comments.js';
import { type GenreGetAllResponseDto } from '~/packages/genres/genres.js';
import { NotificationType } from '~/packages/notification/notification.js';
import { type PromptRequestDto } from '~/packages/prompts/prompts.js';

import { appActions } from '../app/app.js';
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

const createArticle = createAsyncThunk<
  ArticleWithCommentCountResponseDto,
  {
    articlePayload: ArticleRequestDto;
    generatedPrompt: PromptRequestDto | null;
  },
  AsyncThunkConfig
>(
  `${sliceName}/create`,
  async ({ articlePayload, generatedPrompt }, { extra }) => {
    const { articleApi, promptApi } = extra;

    if (generatedPrompt) {
      const { id: promptId, genreId } = await promptApi.create(generatedPrompt);

      return await articleApi.create({
        ...articlePayload,
        genreId,
        promptId,
      });
    }

    return await articleApi.create(articlePayload);
  },
);

const updateArticle = createAsyncThunk<
  ArticleWithCommentCountResponseDto,
  ArticleUpdateRequestPayload,
  AsyncThunkConfig
>(`${sliceName}/update`, async (payload, { extra }) => {
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

  return updatedArticle;
});

const getArticle = createAsyncThunk<
  ArticleResponseDto,
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
      type: NotificationType.SUCCESS,
      message: 'The sharing link was copied to clipboard',
    }),
  );

  return response;
});

const fetchSharedArticle = createAsyncThunk<
  ArticleResponseDto,
  { token: string },
  AsyncThunkConfig
>(`${sliceName}/shared`, (articlePayload, { extra }) => {
  const { articleApi } = extra;

  return articleApi.getByToken(articlePayload.token);
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
  ArticleWithCommentCountResponseDto,
  number,
  AsyncThunkConfig
>(`${sliceName}/delete`, (id, { extra }) => {
  const { articleApi } = extra;

  return articleApi.delete(id);
});

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

export {
  createArticle,
  createComment,
  deleteArticle,
  deleteArticleReaction,
  fetchAll,
  fetchAllCommentsToArticle,
  fetchOwn,
  fetchSharedArticle,
  getAllGenres,
  getArticle,
  getImprovementSuggestions,
  getImprovementSuggestionsBySession,
  reactToArticle,
  shareArticle,
  updateArticle,
  updateComment,
};
