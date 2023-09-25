import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { deleteOrUpdateConditionally } from '~/libs/helpers/helpers.js';
import { type ValueOf } from '~/libs/types/types.js';
import {
  type ArticleImprovementSuggestion,
  type ArticleWithCountsResponseDto,
  type ArticleWithFollowResponseDto,
} from '~/packages/articles/articles.js';
import { type CommentWithRelationsResponseDto } from '~/packages/comments/comments.js';
import { type GenreGetAllResponseDto } from '~/packages/genres/genres.js';

import {
  addArticle,
  addComment,
  addReactionToArticlesFeed,
  addReactionToArticleView,
  createArticle,
  createComment,
  deleteArticle,
  deleteArticleReaction,
  fetchAll,
  fetchAllCommentsToArticle,
  fetchOwn,
  fetchSharedArticle,
  geArticleIdByToken,
  getAllGenres,
  getArticle,
  getImprovementSuggestions,
  getImprovementSuggestionsBySession,
  reactToArticle,
  setShowFavourites,
  toggleIsFavourite,
  updateArticle,
  updateArticleAuthorFollowInfo,
  updateComment,
} from './actions.js';
import {
  applyReaction,
  removeReaction,
  updateReaction,
} from './libs/helpers/helpers.js';

type State = {
  article: ArticleWithFollowResponseDto | null;
  articleComments: CommentWithRelationsResponseDto[];
  articles: ArticleWithCountsResponseDto[];
  dataStatus: ValueOf<typeof DataStatus>;
  genres: GenreGetAllResponseDto['items'];
  articleCommentsDataStatus: ValueOf<typeof DataStatus>;
  articleReactionDataStatus: ValueOf<typeof DataStatus>;
  getArticleStatus: ValueOf<typeof DataStatus>;
  saveArticleStatus: ValueOf<typeof DataStatus>;
  shouldShowFavourites: boolean;
  improvementSuggestions: ArticleImprovementSuggestion[] | null;
  improvementSuggestionsDataStatus: ValueOf<typeof DataStatus>;
  articleIdByToken: number | null;
  articleIdByTokenDataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  article: null,
  articleIdByToken: null,
  articleComments: [],
  articles: [],
  genres: [],
  shouldShowFavourites: false,
  improvementSuggestions: null,
  dataStatus: DataStatus.IDLE,
  articleCommentsDataStatus: DataStatus.IDLE,
  saveArticleStatus: DataStatus.IDLE,
  articleReactionDataStatus: DataStatus.IDLE,
  getArticleStatus: DataStatus.IDLE,
  improvementSuggestionsDataStatus: DataStatus.IDLE,
  articleIdByTokenDataStatus: DataStatus.IDLE,
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
    resetArticleIdByToken(state) {
      state.articleIdByToken = initialState.articleIdByToken;
      state.articleIdByTokenDataStatus = DataStatus.FULFILLED;
    },
  },
  extraReducers(builder) {
    builder.addCase(addArticle.fulfilled, (state, action) => {
      if (action.payload) {
        state.articles = [action.payload, ...state.articles];
      }
    });

    builder.addCase(createArticle.fulfilled, (state) => {
      state.saveArticleStatus = DataStatus.FULFILLED;
    });

    builder.addCase(updateArticle.fulfilled, (state) => {
      state.saveArticleStatus = DataStatus.FULFILLED;
    });

    builder.addCase(getArticle.fulfilled, (state, action) => {
      state.getArticleStatus = DataStatus.FULFILLED;
      state.article = action.payload;
    });

    builder.addCase(setShowFavourites, (state, action) => {
      state.shouldShowFavourites = action.payload;
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

    builder.addCase(addReactionToArticlesFeed.fulfilled, (state, action) => {
      const reaction = action.payload;

      state.articles = state.articles.map((article) => {
        if (article.id !== reaction?.articleId) {
          return article;
        }

        return applyReaction(article, reaction);
      });
    });

    builder.addCase(addReactionToArticleView.fulfilled, (state, action) => {
      const reaction = action.payload;

      if (!reaction || !state.article) {
        return;
      }

      state.article = applyReaction(state.article, reaction);
    });

    builder.addCase(updateArticleAuthorFollowInfo, (state, { payload }) => {
      const { isFollowed, followersCount } = payload;

      if (state.article) {
        state.article = {
          ...state.article,
          author: {
            ...state.article.author,
            isFollowed,
            followersCount,
          },
        };
      }
    });
    builder.addCase(reactToArticle.fulfilled, (state, action) => {
      const { articleId, reaction: updatedReaction } = action.payload;

      if (state.article) {
        state.article = updateReaction(
          state.article as ArticleWithFollowResponseDto,
          updatedReaction,
        );
      }

      state.articles = state.articles.map((article) => {
        if (article.id !== articleId) {
          return article;
        }
        return updateReaction(article, updatedReaction);
      });

      state.articleReactionDataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(deleteArticleReaction.fulfilled, (state, action) => {
      const { articleId, reactionId } = action.payload;

      if (state.article) {
        state.article = removeReaction(
          state.article as ArticleWithFollowResponseDto,
          reactionId,
        );
      }

      state.articles = state.articles.map((article) => {
        if (article.id === articleId) {
          return removeReaction(article, reactionId);
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
    builder.addCase(addComment.fulfilled, (state, action) => {
      if (action.payload) {
        state.articleComments = [action.payload, ...state.articleComments];
      }
    });
    builder.addCase(toggleIsFavourite.fulfilled, (state, action) => {
      const article = action.payload;
      if (article) {
        state.articles = deleteOrUpdateConditionally({
          items: state.articles,
          itemToDeleteOrUpdate: article,
          hasToDelete: !article.isFavourite && state.shouldShowFavourites,
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
    builder.addCase(geArticleIdByToken.rejected, (state) => {
      state.articleIdByTokenDataStatus = DataStatus.REJECTED;
    });
    builder.addCase(geArticleIdByToken.pending, (state) => {
      state.articleIdByTokenDataStatus = DataStatus.PENDING;
    });
    builder.addCase(geArticleIdByToken.fulfilled, (state, action) => {
      state.articleIdByToken = action.payload.id;
      state.articleIdByTokenDataStatus = DataStatus.FULFILLED;
    });
    builder.addMatcher(
      isAnyOf(
        getImprovementSuggestions.fulfilled,
        getImprovementSuggestionsBySession.fulfilled,
      ),
      (state, action) => {
        state.improvementSuggestions = action.payload;
        state.improvementSuggestionsDataStatus = DataStatus.FULFILLED;
      },
    );
    builder.addMatcher(
      isAnyOf(
        getImprovementSuggestions.pending,
        getImprovementSuggestionsBySession.pending,
      ),
      (state) => {
        state.improvementSuggestionsDataStatus = DataStatus.PENDING;
      },
    );
    builder.addMatcher(
      isAnyOf(
        getImprovementSuggestions.rejected,
        getImprovementSuggestionsBySession.rejected,
      ),
      (state) => {
        state.improvementSuggestionsDataStatus = DataStatus.REJECTED;
      },
    );
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
      isAnyOf(createArticle.pending, updateArticle.pending),
      (state) => {
        state.saveArticleStatus = DataStatus.PENDING;
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
        fetchSharedArticle.rejected,
        deleteArticle.rejected,
        toggleIsFavourite.rejected,
      ),
      (state) => {
        state.dataStatus = DataStatus.REJECTED;
      },
    );
    builder.addMatcher(
      isAnyOf(createArticle.rejected, updateArticle.rejected),
      (state) => {
        state.saveArticleStatus = DataStatus.REJECTED;
      },
    );
  },
});

export { actions, name, reducer };
