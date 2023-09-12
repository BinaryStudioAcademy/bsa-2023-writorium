import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type ArticleWithAuthorType } from '~/packages/articles/articles.js';

import {
  createArticle,
  fetchAll,
  fetchOwn,
  fetchSharedArticle,
  getArticle,
  updateArticle,
} from './actions.js';

type State = {
  article: ArticleWithAuthorType | null;
  articles: ArticleWithAuthorType[];
  dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  article: null,
  articles: [],
  dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'articles',
  reducers: {
    resetArticles(state) {
      state.articles = initialState.articles;
      state.dataStatus = DataStatus.IDLE;
    },
  },
  extraReducers(builder) {
    builder.addCase(createArticle.fulfilled, (state, action) => {
      state.articles = [...state.articles, action.payload];
      state.dataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(updateArticle.fulfilled, (state, action) => {
      const article = action.payload;
      if (article) {
        state.articles = state.articles.map((item) => {
          if (article.id === item.id) {
            return article;
          }
          return item;
        });
      }
      state.dataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(getArticle.fulfilled, (state, action) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.article = action.payload;
    });
    builder.addCase(fetchSharedArticle.fulfilled, (state, action) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.article = action.payload;
    });
    builder.addMatcher(
      isAnyOf(fetchAll.fulfilled, fetchOwn.fulfilled),
      (state, action) => {
        state.dataStatus = DataStatus.FULFILLED;
        state.articles = [...state.articles, ...action.payload.items];
      },
    );
    builder.addMatcher(
      isAnyOf(
        fetchAll.pending,
        fetchOwn.pending,
        createArticle.pending,
        updateArticle.pending,
        getArticle.pending,
        fetchSharedArticle.pending,
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
        getArticle.rejected,
        fetchSharedArticle.rejected,
      ),
      (state) => {
        state.dataStatus = DataStatus.REJECTED;
      },
    );
  },
});

export { actions, name, reducer };
