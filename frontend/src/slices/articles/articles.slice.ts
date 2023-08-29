import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type ArticleBaseResponseDto } from '~/packages/articles/articles.js';

import { createArticle } from './actions.js';

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
    builder.addCase(createArticle.pending, (state) => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(createArticle.fulfilled, (state, action) => {
      state.articles.push(action.payload);
      state.dataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(createArticle.rejected, (state) => {
      state.dataStatus = DataStatus.REJECTED;
    });
  },
});

export { actions, name, reducer };
