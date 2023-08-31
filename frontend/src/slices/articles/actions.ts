import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/types.js';
import {
  type ArticleBaseResponseDto,
  type ArticleRequestDto,
} from '~/packages/articles/articles.js';

import { name as sliceName } from './articles.slice.js';

const createArticle = createAsyncThunk<
  ArticleBaseResponseDto,
  ArticleRequestDto,
  AsyncThunkConfig
>(`${sliceName}/create`, async (articlePayload, { extra }) => {
  const { articleApi } = extra;

  return await articleApi.create(articlePayload);
});

const getArticle = createAsyncThunk<
  ArticleBaseResponseDto,
  string,
  AsyncThunkConfig
>(`${sliceName}/getArticle`, async (id, { extra }) => {
  const { articleApi } = extra;

  return await articleApi.getArticle(id);
});

export { createArticle, getArticle };
