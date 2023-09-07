import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type ArticleWithAuthorType } from '~/packages/articles/articles.js';

import { createArticle, fetchAll, fetchOwn, updateArticle } from './actions.js';

type State = {
  articles: ArticleWithAuthorType[];
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
    builder.addCase(createArticle.fulfilled, (state, action) => {
      state.articles = [...state.articles, action.payload];
      state.dataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(updateArticle.fulfilled, (state, action) => {
      const article = action.payload;
      if (article) {
        state.articles = [
          article,
          ...state.articles.filter((item) => item.id !== article.id),
        ];
      }
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
      isAnyOf(
        fetchAll.pending,
        fetchOwn.pending,
        createArticle.pending,
        updateArticle.pending,
      ),
      (state) => {
        state.dataStatus = DataStatus.PENDING;
      },
    );
    builder.addMatcher(
      isAnyOf(
        fetchAll.rejected,
        fetchOwn.rejected,
        createArticle.rejected,
        updateArticle.rejected,
      ),
      (state) => {
        state.dataStatus = DataStatus.REJECTED;
      },
    );
  },
});

export { actions, name, reducer };
