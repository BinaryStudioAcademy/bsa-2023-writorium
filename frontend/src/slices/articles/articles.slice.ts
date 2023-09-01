import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type ArticleBaseResponseDto } from '~/packages/articles/articles.js';

import { createArticle, loadAll } from './actions.js';

type State = {
  articles: ArticleBaseResponseDto[];
  dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  articles: [],
  dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'articles',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadAll.fulfilled, (state, action) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.articles = action.payload.items;
    });
    builder.addCase(createArticle.fulfilled, (state, action) => {
      state.articles = [...state.articles, action.payload];
      state.dataStatus = DataStatus.FULFILLED;
    });
    builder.addMatcher(
      isAnyOf(loadAll.pending, createArticle.pending),
      (state) => {
        state.dataStatus = DataStatus.PENDING;
      },
    );
    builder.addMatcher(
      isAnyOf(loadAll.rejected, createArticle.rejected),
      (state) => {
        state.dataStatus = DataStatus.REJECTED;
      },
    );
  },
});

export { actions, name, reducer };
