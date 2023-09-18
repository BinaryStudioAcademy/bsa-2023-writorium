import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import {
  type ArticleResponseDto,
  type ArticleWithCommentCountResponseDto,
} from '~/packages/articles/articles.js';
import { type CommentWithRelationsResponseDto } from '~/packages/comments/comments.js';
import { type GenreGetAllResponseDto } from '~/packages/genres/genres.js';

import {
  createArticle,
  createComment,
  deleteArticle,
  deleteArticleReaction,
  fetchAll,
  fetchAllCommentsToArticle,
  fetchOwn,
  fetchSharedArticle,
  getAllGenres,
  getArticle,
  reactToArticle,
  setShowFavourites,
  toggleIsFavourite,
  updateArticle,
  updateComment,
} from './actions.js';

type State = {
  article: ArticleResponseDto | null;
  articleComments: CommentWithRelationsResponseDto[];
  articles: ArticleWithCommentCountResponseDto[];
  dataStatus: ValueOf<typeof DataStatus>;
  genres: GenreGetAllResponseDto['items'];
  articleCommentsDataStatus: ValueOf<typeof DataStatus>;
  articleReactionDataStatus: ValueOf<typeof DataStatus>;
  getArticleStatus: ValueOf<typeof DataStatus>;
  showFavourites: boolean;
};

const initialState: State = {
  article: null,
  articleComments: [],
  articles: [],
  genres: [],
  showFavourites: false,
  dataStatus: DataStatus.IDLE,
  articleCommentsDataStatus: DataStatus.IDLE,
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
    builder.addCase(setShowFavourites, (state, action) => {
      state.showFavourites = action.payload;
    });
    builder.addCase(deleteArticle.fulfilled, (state, action) => {
      const article = action.payload;
      if (article) {
        state.articles = state.articles.filter(
          (item) => item.id !== article.id,
        );
      }
      state.dataStatus = DataStatus.FULFILLED;
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

    builder.addCase(createComment.fulfilled, (state, action) => {
      state.articleComments = [action.payload, ...state.articleComments];
      state.articleCommentsDataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(fetchAllCommentsToArticle.fulfilled, (state, action) => {
      state.articleComments = action.payload.items;
      state.articleCommentsDataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(toggleIsFavourite.fulfilled, (state, action) => {
      const article = action.payload;
      if (article) {
        state.articles =
          !article.isFavourite && state.showFavourites
            ? state.articles.filter((item) => item.id !== article.id)
            : state.articles.map((item) => {
                if (article.id === item.id) {
                  return article;
                }
                return item;
              });

        state.dataStatus = DataStatus.FULFILLED;
      }
    });

    builder.addCase(updateComment.fulfilled, (state, action) => {
      const updatedComment = action.payload;

      state.articleComments = state.articleComments.map((comment) => {
        return comment.id === updatedComment.id ? updatedComment : comment;
      });
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
        deleteArticle.pending,
        toggleIsFavourite.pending,
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
        deleteArticle.rejected,
        toggleIsFavourite.rejected,
      ),
      (state) => {
        state.dataStatus = DataStatus.REJECTED;
      },
    );
  },
});

export { actions, name, reducer };
