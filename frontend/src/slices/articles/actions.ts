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
>(`${sliceName}/create`, (articlePayload, { extra }) => {
  const { articleApi } = extra;

  return articleApi.create(articlePayload);
});

const shareArticle = createAsyncThunk<
  { token: string },
  { id: string },
  AsyncThunkConfig
>(`${sliceName}/share`, (articlePayload, { extra }) => {
  const { articleApi } = extra;

  return articleApi.share(articlePayload.id);
});

export { createArticle, shareArticle };
