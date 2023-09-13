import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/types.js';
import {
  type ArticleGetAllResponseDto,
  type ArticleRequestDto,
  type ArticleResponseDto,
  type ArticlesFilters,
  type ArticleWithCommentCountResponseDto,
} from '~/packages/articles/articles.js';
import {
  type CommentBaseRequestDto,
  type CommentGetAllResponseDto,
  type CommentUpdateRequestDto,
  type CommentWithRelationsResponseDto,
} from '~/packages/comments/comments.js';
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

const getArticle = createAsyncThunk<
  ArticleResponseDto,
  number,
  AsyncThunkConfig
>(`${sliceName}/getArticle`, (id, { extra }) => {
  const { articleApi } = extra;

  return articleApi.getArticle(id);
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
  CommentUpdateRequestDto,
  AsyncThunkConfig
>(`${sliceName}/update-comment`, (payload, { extra }) => {
  const { commentsApi } = extra;

  return commentsApi.update(payload);
});

export {
  createArticle,
  createComment,
  fetchAll,
  fetchAllCommentsToArticle,
  fetchOwn,
  getArticle,
  updateComment,
};
