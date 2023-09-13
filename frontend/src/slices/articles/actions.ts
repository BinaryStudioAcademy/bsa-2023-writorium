import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  type ArticlesFilters,
  type UserDetailsDto,
} from 'shared/build/index.js';

import { type AsyncThunkConfig } from '~/libs/types/types.js';
import {
  type ArticleBaseResponseDto,
  type ArticleGetAllResponseDto,
  type ArticleRequestDto,
} from '~/packages/articles/articles.js';
import { type GenreGetAllResponseDto } from '~/packages/genres/genres.js';
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

const getArticle = createAsyncThunk<
  ArticleBaseResponseDto,
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

export {
  createArticle,
  fetchAll,
  fetchOwn,
  getAllAuthors,
  getAllGenres,
  getArticle,
};
