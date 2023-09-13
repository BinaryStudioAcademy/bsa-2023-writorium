import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import {
  type ArticleResponseDto,
  type ArticleWithCommentCountResponseDto,
} from '~/packages/articles/articles.js';
import { type CommentWithRelationsResponseDto } from '~/packages/comments/comments.js';

import {
  createArticle,
  createComment,
  fetchAll,
  fetchAllCommentsToArticle,
  fetchOwn,
  getArticle,
  updateComment,
} from './actions.js';

type State = {
  article: ArticleResponseDto | null;
  articleComments: CommentWithRelationsResponseDto[];
  articles: ArticleWithCommentCountResponseDto[];
  dataStatus: ValueOf<typeof DataStatus>;
  articleCommentsDataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  article: null,
  articleComments: [],
  articles: [],
  dataStatus: DataStatus.IDLE,
  articleCommentsDataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'articles',
  reducers: {
    resetArticles(state) {
      state.articles = initialState.articles;
      state.dataStatus = DataStatus.IDLE;
    },
    resetComments(state) {
      state.articleComments = initialState.articleComments;
      state.articleCommentsDataStatus = DataStatus.IDLE;
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
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.articleComments = [action.payload, ...state.articleComments];
      state.articleCommentsDataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(fetchAllCommentsToArticle.fulfilled, (state, action) => {
      state.articleComments = action.payload.items;
      state.articleCommentsDataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(updateComment.fulfilled, (state, action) => {
      const updatedComment = action.payload;

      state.articleComments = state.articleComments.map((comment) =>
        comment.id === updatedComment.id ? updatedComment : comment,
      );
      state.articleCommentsDataStatus = DataStatus.FULFILLED;
    });
    builder.addMatcher(
      isAnyOf(
        createComment.pending,
        fetchAllCommentsToArticle.pending,
        updateComment.pending,
      ),
      (state) => {
        state.articleCommentsDataStatus = DataStatus.PENDING;
      },
    );
    builder.addMatcher(
      isAnyOf(
        createComment.rejected,
        fetchAllCommentsToArticle.rejected,
        updateComment.rejected,
      ),
      (state) => {
        state.articleCommentsDataStatus = DataStatus.REJECTED;
      },
    );
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
