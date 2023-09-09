import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/types.js';
import {
  type ArticleBaseResponseDto,
  type ArticleGetAllResponseDto,
  type ArticleRequestDto,
  type ArticleWithAuthorType,
} from '~/packages/articles/articles.js';
import { NotificationType } from '~/packages/notification/notification.js';
import { type PromptRequestDto } from '~/packages/prompts/prompts.js';

import { appActions } from '../app/app.js';
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

const getArticle = createAsyncThunk<
  ArticleBaseResponseDto,
  number,
  AsyncThunkConfig
>(`${sliceName}/getArticle`, (id, { extra }) => {
  const { articleApi } = extra;

  return articleApi.getArticle(id);
});

const shareArticle = createAsyncThunk<
  { link: string },
  { id: string },
  AsyncThunkConfig
>(`${sliceName}/share`, (articlePayload, { dispatch, extra }) => {
  const { articleApi } = extra;
  void dispatch(
    appActions.notify({
      type: NotificationType.SUCCESS,
      message: 'The sharing link was copied to clipboard',
    }),
  );

  return articleApi.share(articlePayload.id);
});

const fetchSharedArticle = createAsyncThunk<
  ArticleWithAuthorType,
  { token: string },
  AsyncThunkConfig
>(`${sliceName}/share`, (articlePayload, { extra }) => {
  const { articleApi } = extra;

  return articleApi.getByToken(articlePayload.token);
});

export {
  createArticle,
  fetchAll,
  fetchOwn,
  fetchSharedArticle,
  getArticle,
  shareArticle,
};
