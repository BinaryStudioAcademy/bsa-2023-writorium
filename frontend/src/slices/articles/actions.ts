import { createAsyncThunk } from '@reduxjs/toolkit';
import { type ArticlesFilters } from 'shared/build/index.js';

import { type AsyncThunkConfig } from '~/libs/types/types.js';
import {
  type ArticleBaseResponseDto,
  type ArticleGetAllResponseDto,
  type ArticleRequestDto,
  type ArticleUpdateRequestPayload,
  type ArticleWithAuthorType,
} from '~/packages/articles/articles.js';
import { type PromptRequestDto } from '~/packages/prompts/prompts.js';

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
  ArticleBaseResponseDto,
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
  ArticleWithAuthorType,
  ArticleUpdateRequestPayload,
  AsyncThunkConfig
>(`${sliceName}/update`, async (payload, { extra }) => {
  const { articleApi } = extra;

  return await articleApi.update(payload);
});

const getArticle = createAsyncThunk<
  ArticleBaseResponseDto,
  number,
  AsyncThunkConfig
>(`${sliceName}/getArticle`, (id, { extra }) => {
  const { articleApi } = extra;

  return articleApi.getArticle(id);
});

const deleteArticle = createAsyncThunk<
  ArticleWithAuthorType,
  number,
  AsyncThunkConfig
>(`${sliceName}/delete`, async (id, { extra }) => {
  const { articleApi } = extra;

  return await articleApi.delete(id);
});

export {
  createArticle,
  deleteArticle,
  fetchAll,
  fetchOwn,
  getArticle,
  updateArticle,
};
