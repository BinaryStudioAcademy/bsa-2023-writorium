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
  getAllGenres,
  getArticle,
  getArticleIdByToken,
  getImprovementSuggestions,
  getImprovementSuggestionsBySession,
  getSharedLink,
  reactToArticle,
  setArticleFormDataFromLocalStorage,
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
  article:
    | ArticleWithFollowResponseDto
    | (ArticleWithFollowResponseDto & ArticleWithCountsResponseDto)
    | null;
  articleComments: CommentWithRelationsResponseDto[];
  articles: ArticleWithCountsResponseDto[];
  fetchArticlesDataStatus: ValueOf<typeof DataStatus>;
  dataStatus: ValueOf<typeof DataStatus>;
  genres: GenreGetAllResponseDto['items'];
  fetchArticleCommentsDataStatus: ValueOf<typeof DataStatus>;
  articleReactionDataStatus: ValueOf<typeof DataStatus>;
  getArticleStatus: ValueOf<typeof DataStatus>;
  saveArticleStatus: ValueOf<typeof DataStatus>;
  shouldShowFavourites: boolean;
  improvementSuggestions: ArticleImprovementSuggestion[] | null;
  improvementSuggestionsDataStatus: ValueOf<typeof DataStatus>;
  articleIdByToken: number | null;
  articleIdByTokenDataStatus: ValueOf<typeof DataStatus>;
  createCommentDataStatus: ValueOf<typeof DataStatus>;
  sharedLink: string | null;
  sharedLinkDataStatus: ValueOf<typeof DataStatus>;
  articleDataFromLocalStorage: {
    title: string | null;
    text: string | null;
    prompt: string | null;
  } | null;
};

const initialState: State = {
  article: null,
  articleIdByToken: null,
  articleComments: [],
  articles: [],
  genres: [],
  shouldShowFavourites: false,
  improvementSuggestions: null,
  sharedLink: null,
  dataStatus: DataStatus.IDLE,
  fetchArticlesDataStatus: DataStatus.IDLE,
  fetchArticleCommentsDataStatus: DataStatus.IDLE,
  saveArticleStatus: DataStatus.IDLE,
  articleReactionDataStatus: DataStatus.IDLE,
  getArticleStatus: DataStatus.IDLE,
  improvementSuggestionsDataStatus: DataStatus.IDLE,
  articleIdByTokenDataStatus: DataStatus.IDLE,
  createCommentDataStatus: DataStatus.IDLE,
  sharedLinkDataStatus: DataStatus.IDLE,
  articleDataFromLocalStorage: null,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'articles',
  reducers: {
    resetArticles(state) {
      state.articles = initialState.articles;
      state.fetchArticlesDataStatus = DataStatus.IDLE;
    },
    resetComments(state) {
      state.articleComments = initialState.articleComments;
      state.fetchArticleCommentsDataStatus = DataStatus.IDLE;
      state.createCommentDataStatus = DataStatus.IDLE;
    },
    resetArticleIdByToken(state) {
      state.articleIdByToken = initialState.articleIdByToken;
      state.articleIdByTokenDataStatus = DataStatus.FULFILLED;
    },
    resetSharedLink(state) {
      state.sharedLink = initialState.sharedLink;
      state.sharedLinkDataStatus = initialState.sharedLinkDataStatus;
    },
  },
  extraReducers(builder) {
    builder.addCase(addArticle.fulfilled, (state, action) => {
      if (action.payload) {
        state.articles = [action.payload, ...state.articles];
      }
    });

    builder.addCase(getSharedLink.fulfilled, (state, action) => {
      state.sharedLinkDataStatus = DataStatus.FULFILLED;
      state.sharedLink = action.payload.link;
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
    builder.addCase(getSharedLink.pending, (state) => {
      state.sharedLinkDataStatus = DataStatus.PENDING;
    });
    builder.addCase(getSharedLink.rejected, (state) => {
      state.sharedLinkDataStatus = DataStatus.REJECTED;
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
      state.createCommentDataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(createComment.pending, (state) => {
      state.createCommentDataStatus = DataStatus.PENDING;
    });
    builder.addCase(createComment.rejected, (state) => {
      state.createCommentDataStatus = DataStatus.REJECTED;
    });

    builder.addCase(fetchAllCommentsToArticle.fulfilled, (state, action) => {
      state.articleComments = action.payload.items;
      state.fetchArticleCommentsDataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(fetchAllCommentsToArticle.pending, (state) => {
      state.fetchArticleCommentsDataStatus = DataStatus.PENDING;
    });
    builder.addCase(fetchAllCommentsToArticle.rejected, (state) => {
      state.fetchArticleCommentsDataStatus = DataStatus.REJECTED;
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

      if (article && state.article !== null) {
        state.article = article;
      }
    });

    builder.addCase(updateComment.fulfilled, (state, action) => {
      const updatedComment = action.payload;

      state.articleComments = state.articleComments.map((comment) => {
        return comment.id === updatedComment.id ? updatedComment : comment;
      });
    });
    builder.addCase(getArticleIdByToken.rejected, (state) => {
      state.articleIdByTokenDataStatus = DataStatus.REJECTED;
    });
    builder.addCase(getArticleIdByToken.pending, (state) => {
      state.articleIdByTokenDataStatus = DataStatus.PENDING;
    });
    builder.addCase(getArticleIdByToken.fulfilled, (state, action) => {
      state.articleIdByToken = action.payload.id;
      state.articleIdByTokenDataStatus = DataStatus.FULFILLED;
    });

    builder.addCase(
      setArticleFormDataFromLocalStorage.fulfilled,
      (state, action) => {
        state.articleDataFromLocalStorage = { ...action.payload };
      },
    );

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
      isAnyOf(fetchAll.fulfilled, fetchOwn.fulfilled),
      (state, action) => {
        state.fetchArticlesDataStatus = DataStatus.FULFILLED;
        state.articles = [...state.articles, ...action.payload.items];
      },
    );
    builder.addMatcher(isAnyOf(fetchAll.pending, fetchOwn.pending), (state) => {
      state.fetchArticlesDataStatus = DataStatus.PENDING;
    });
    builder.addMatcher(
      isAnyOf(fetchAll.rejected, fetchOwn.rejected),
      (state) => {
        state.fetchArticlesDataStatus = DataStatus.REJECTED;
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
