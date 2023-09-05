import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/types.js';
import {
  type ArticleBaseResponseDto,
  type ArticleGetAllResponseDto,
  type ArticleRequestDto,
} from '~/packages/articles/articles.js';
import { type PromptRequestDto } from '~/packages/prompts/prompts.js';

import { name as sliceName } from './articles.slice.js';

const fetchAll = createAsyncThunk<
  ArticleGetAllResponseDto,
  undefined,
  AsyncThunkConfig
>(`${sliceName}/get-all`, (_, { extra }) => {
  const { articleApi } = extra;

  return articleApi.getAll();
});

const fetchOwn = createAsyncThunk<
  ArticleGetAllResponseDto,
  undefined,
  AsyncThunkConfig
>(`${sliceName}/get-own`, (_, { extra }) => {
  const { articleApi } = extra;

  return articleApi.getOwn();
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

const shareArticle = createAsyncThunk<
  { token: string },
  { id: string },
  AsyncThunkConfig
>(`${sliceName}/share`, (articlePayload, { extra }) => {
  const { articleApi } = extra;

  return articleApi.share(articlePayload.id);
});

export { createArticle, fetchAll, fetchOwn,shareArticle };
