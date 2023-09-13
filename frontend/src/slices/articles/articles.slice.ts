import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type ArticleResponseDto } from '~/packages/articles/articles.js';
import { type GenreGetAllResponseDto } from '~/packages/genres/genres.js';

import {
  createArticle,
  deleteArticleReaction,
  fetchAll,
  fetchOwn,
  fetchSharedArticle,
  getAllGenres,
  getArticle,
  reactToArticle,
  updateArticle,
} from './actions.js';

type State = {
  article: ArticleResponseDto | null;
  articles: ArticleResponseDto[];
  dataStatus: ValueOf<typeof DataStatus>;
  genres: GenreGetAllResponseDto['items'];
  articleReactionDataStatus: ValueOf<typeof DataStatus>;
  getArticleStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  article: null,
  articles: [],
  genres: [],
  dataStatus: DataStatus.IDLE,
  articleReactionDataStatus: DataStatus.IDLE,
  getArticleStatus: DataStatus.IDLE,
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
      state.getArticleStatus = DataStatus.FULFILLED;
      state.article = action.payload;
    });
    builder.addCase(reactToArticle.fulfilled, (state, action) => {
      const { articleId, reaction: updatedReaction } = action.payload;

      state.articles = state.articles.map((article) => {
        if (article.id !== articleId) {
          return article;
        }

        let reactionIndex: number;

        const existingReaction = article.reactions.find(({ id }, index) => {
          if (id === updatedReaction.id) {
            reactionIndex = index;
            return true;
          }
        });

        if (!existingReaction) {
          return {
            ...article,
            reactions: [...article.reactions, updatedReaction],
          };
        }

        const reactionsToUpdate = [...article.reactions];
        reactionsToUpdate[reactionIndex!] = updatedReaction;

        return {
          ...article,
          reactions: reactionsToUpdate,
        };
      });

      state.articleReactionDataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(deleteArticleReaction.fulfilled, (state, action) => {
      const { articleId, reactionId } = action.payload;

      state.articles = state.articles.map((article) => {
        if (article.id === articleId) {
          const reactionIndex = article.reactions.findIndex(
            ({ id }) => id === reactionId,
          );

          const reactionsToUpdate = [...article.reactions];
          reactionsToUpdate.splice(reactionIndex, 1);

          return {
            ...article,
            reactions: reactionsToUpdate,
          };
        }
        return article;
      });

      state.articleReactionDataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(getArticle.pending, (state) => {
      state.getArticleStatus = DataStatus.PENDING;
    });
    builder.addCase(getArticle.rejected, (state) => {
      state.getArticleStatus = DataStatus.REJECTED;
    });
    builder.addCase(fetchSharedArticle.fulfilled, (state, action) => {
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

    builder.addMatcher(
      isAnyOf(fetchAll.fulfilled, fetchOwn.fulfilled),
      (state, action) => {
        state.dataStatus = DataStatus.FULFILLED;
        state.articles = [...state.articles, ...action.payload.items];
      },
    );
    builder.addMatcher(
      isAnyOf(reactToArticle.pending, deleteArticleReaction.pending),
      (state) => {
        state.articleReactionDataStatus = DataStatus.PENDING;
      },
    );
    builder.addMatcher(
      isAnyOf(
        fetchAll.pending,
        fetchOwn.pending,
        createArticle.pending,
        updateArticle.pending,
        getArticle.pending,
        getAllGenres.pending,
        fetchSharedArticle.pending,
      ),
      (state) => {
        state.dataStatus = DataStatus.PENDING;
      },
    );
    builder.addMatcher(
      isAnyOf(reactToArticle.rejected, deleteArticleReaction.rejected),
      (state) => {
        state.articleReactionDataStatus = DataStatus.REJECTED;
      },
    );
    builder.addMatcher(
      isAnyOf(
        fetchAll.rejected,
        fetchOwn.rejected,
        createArticle.rejected,
        updateArticle.rejected,
        fetchSharedArticle.rejected,
      ),
      (state) => {
        state.dataStatus = DataStatus.REJECTED;
      },
    );
  },
});

export { actions, name, reducer };
