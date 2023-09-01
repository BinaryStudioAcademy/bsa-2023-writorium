import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/types.js';
import {
  type ArticleBaseResponseDto,
  type ArticleGetAllResponseDto,
  type ArticleRequestDto,
} from '~/packages/articles/articles.js';

import { name as sliceName } from './articles.slice.js';

const loadAll = createAsyncThunk<
  ArticleGetAllResponseDto,
  undefined,
  AsyncThunkConfig
>(`${sliceName}/get-all`, (_, { extra }) => {
  const { articleApi } = extra;

  return articleApi.getAll();
});

const loadOwn = createAsyncThunk<
  ArticleGetAllResponseDto,
  { id: number },
  AsyncThunkConfig
>(`${sliceName}/get-own`, ({ id }, { extra }) => {
  const { articleApi } = extra;

  return articleApi.getOwn(id);
});

const createArticle = createAsyncThunk<
  ArticleBaseResponseDto,
  ArticleRequestDto,
  AsyncThunkConfig
>(`${sliceName}/create`, (articlePayload, { extra }) => {
  const { articleApi } = extra;

  return articleApi.create(articlePayload);
});

export { createArticle, loadAll, loadOwn };
