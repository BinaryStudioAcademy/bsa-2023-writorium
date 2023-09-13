import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { type UserDetailsDto } from 'shared/build/index.js';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type ArticleWithAuthorType } from '~/packages/articles/articles.js';
import { type GenreGetAllResponseDto } from '~/packages/genres/genres.js';

import {
  createArticle,
  fetchAll,
  fetchOwn,
  getAllAuthors,
  getAllGenres,
  getArticle,
} from './actions.js';

type State = {
  article: ArticleWithAuthorType | null;
  articles: ArticleWithAuthorType[];
  dataStatus: ValueOf<typeof DataStatus>;
  genres: GenreGetAllResponseDto['items'];
  authors: UserDetailsDto[];
};

const initialState: State = {
  article: null,
  articles: [],
  genres: [],
  authors: [],
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
    builder.addCase(getArticle.fulfilled, (state, action) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.article = action.payload;
    });
    builder.addCase(getAllGenres.fulfilled, (state, action) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.genres = action.payload.items;
    });
    builder.addCase(getAllGenres.rejected, (state) => {
      state.dataStatus = DataStatus.REJECTED;
      state.genres = [];
    });
    builder.addCase(getAllAuthors.fulfilled, (state, action) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.authors = action.payload;
    });
    builder.addCase(getAllAuthors.rejected, (state) => {
      state.dataStatus = DataStatus.REJECTED;
      state.authors = [];
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
        getArticle.pending,
        getAllGenres.pending,
        getAllAuthors.pending,
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
        getArticle.rejected,
      ),
      (state) => {
        state.dataStatus = DataStatus.REJECTED;
      },
    );
  },
});

export { actions, name, reducer };
