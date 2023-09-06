import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type ArticleWithAuthorType } from '~/packages/articles/articles.js';

import {
  createArticle,
  fetchAll,
  fetchOwn,
  fetchSharedArticle,
} from './actions.js';

type State = {
  articles: ArticleWithAuthorType[];
  sharedArticle: ArticleWithAuthorType[] | null;
  dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  articles: [],
  sharedArticle: null,
  dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'articles',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createArticle.fulfilled, (state, action) => {
      state.articles = [...state.articles, action.payload];
      state.dataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(fetchSharedArticle.fulfilled, (state, action) => {
      state.sharedArticle = [action.payload];
      state.dataStatus = DataStatus.FULFILLED;
    });
    builder.addMatcher(
      isAnyOf(fetchAll.fulfilled, fetchOwn.fulfilled),
      (state, action) => {
        state.dataStatus = DataStatus.FULFILLED;
        state.articles = action.payload.items;
      },
    );
    builder.addMatcher(
      isAnyOf(fetchAll.pending, fetchOwn.pending, createArticle.pending),
      (state) => {
        state.dataStatus = DataStatus.PENDING;
      },
    );
    builder.addMatcher(
      isAnyOf(fetchAll.rejected, fetchOwn.rejected, createArticle.rejected),
      (state) => {
        state.dataStatus = DataStatus.REJECTED;
      },
    );
  },
});

export { actions, name, reducer };
