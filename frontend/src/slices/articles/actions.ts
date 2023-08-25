import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/types.js';
import {
  type ArticleCreateRequestDto,
  type ArticleCreateResponseDto,
} from '~/packages/articles/articles.js';

import { name as sliceName } from './articles.slice.js';

const createArticle = createAsyncThunk<
  ArticleCreateResponseDto,
  ArticleCreateRequestDto,
  AsyncThunkConfig
>(`${sliceName}/create`, (articlePayload, { extra }) => {
  const { articleApi } = extra;

  return articleApi.create(articlePayload);
});

export { createArticle };
