import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/types.js';
import { type ArticleGenreStatsFilters } from '~/packages/articles/articles.js';
import {
  type UserActivityResponseDto,
  type UserArticlesGenreStatsResponseDto,
  type UserAuthResponseDto,
  type UserDetailsAuthorResponseDto,
  type UserFollowResponseDto,
  type UserGetAllResponseDto,
  type UserUpdateRequestDto,
} from '~/packages/users/users.js';
import { actions as appActions } from '~/slices/app/app.js';
import { actions as articleActions } from '~/slices/articles/articles.js';

import { name as sliceName } from './users.slice.js';

const loadAll = createAsyncThunk<
  UserGetAllResponseDto,
  undefined,
  AsyncThunkConfig
>(`${sliceName}/sign-up`, (_, { extra }) => {
  const { userApi } = extra;

  return userApi.getAll();
});

const getUserActivity = createAsyncThunk<
  UserActivityResponseDto[],
  undefined,
  AsyncThunkConfig
>(`${sliceName}/get-user-activity`, (_, { extra }) => {
  const { userApi } = extra;

  return userApi.getUserActivity();
});

const getUserArticlesGenresStats = createAsyncThunk<
  UserArticlesGenreStatsResponseDto,
  ArticleGenreStatsFilters,
  AsyncThunkConfig
>(`${sliceName}/get-user-articles-genres-stats`, (payload, { extra }) => {
  const { userApi } = extra;

  return userApi.getUserArticlesGenresStats(payload);
});

const updateUser = createAsyncThunk<
  UserAuthResponseDto,
  UserUpdateRequestDto,
  AsyncThunkConfig
>(`${sliceName}/users`, async (updateUserPayload, { extra }) => {
  const { userApi } = extra;

  return await userApi.updateUser(updateUserPayload);
});

const getAllAuthors = createAsyncThunk<
  UserDetailsAuthorResponseDto[],
  undefined,
  AsyncThunkConfig
>(`${sliceName}/getAllAuthors`, async (_loginPayload, { extra }) => {
  const { userApi } = extra;
  return await userApi.getAllAuthors();
});

const toggleFollowAuthor = createAsyncThunk<
  UserFollowResponseDto,
  number,
  AsyncThunkConfig
>(`${sliceName}/follow`, async (authorId, { extra, dispatch }) => {
  const { userApi } = extra;
  const articleAuthorFollowInfo = await userApi.toggleFollowAuthor(authorId);
  dispatch(
    articleActions.updateArticleAuthorFollowInfo(articleAuthorFollowInfo),
  );

  void dispatch(
    appActions.notify({
      type: 'info',
      message: articleAuthorFollowInfo.isFollowed
        ? 'You have been subscribed'
        : 'You have been unsubscribed',
    }),
  );

  return articleAuthorFollowInfo;
});

const getAuthorFollowersCountAndStatus = createAsyncThunk<
  UserFollowResponseDto,
  number,
  AsyncThunkConfig
>(
  `${sliceName}/get-author-followers-count-and-status`,
  async (authorId, { extra, dispatch }) => {
    const { userApi } = extra;
    const articleAuthorFollowInfo =
      await userApi.getAuthorFollowersCountAndStatus(authorId);

    dispatch(
      articleActions.updateArticleAuthorFollowInfo(articleAuthorFollowInfo),
    );

    return articleAuthorFollowInfo;
  },
);

export {
  getAllAuthors,
  getAuthorFollowersCountAndStatus,
  getUserActivity,
  getUserArticlesGenresStats,
  loadAll,
  toggleFollowAuthor,
  updateUser,
};
