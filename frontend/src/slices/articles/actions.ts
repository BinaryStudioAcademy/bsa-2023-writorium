import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  type ArticlesFilters,
  type UserDetailsDto,
} from 'shared/build/index.js';

import { type AsyncThunkConfig } from '~/libs/types/types.js';
import {
  type ArticleGetAllResponseDto,
  type ArticleReactionRequestDto,
  type ArticleRequestDto,
  type ArticleResponseDto,
  type ArticleUpdateRequestPayload,
  type ReactionResponseDto,
} from '~/packages/articles/articles.js';
import { type GenreGetAllResponseDto } from '~/packages/genres/genres.js';
import { NotificationType } from '~/packages/notification/notification.js';
import { type PromptRequestDto } from '~/packages/prompts/prompts.js';

import { appActions } from '../app/app.js';
import { name as sliceName } from './articles.slice.js';

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
  ArticleResponseDto,
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
  ArticleResponseDto,
  ArticleUpdateRequestPayload,
  AsyncThunkConfig
>(`${sliceName}/update`, async (payload, { extra }) => {
  const { articleApi } = extra;

  return await articleApi.update(payload);
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

const getAllAuthors = createAsyncThunk<
  UserDetailsDto[],
  undefined,
  AsyncThunkConfig
>(`${sliceName}/getAllAuthors`, async (_loginPayload, { extra }) => {
  const { articleApi } = extra;
  return await articleApi.getAllAuthors();
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

export {
  createArticle,
  deleteArticleReaction,
  fetchAll,
  fetchOwn,
  fetchSharedArticle,
  getAllAuthors,
  getAllGenres,
  getArticle,
  reactToArticle,
  shareArticle,
  updateArticle,
};
