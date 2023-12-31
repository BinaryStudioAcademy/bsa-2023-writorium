type FilterFormValues = {
  titleFilter: string;
  authorId: number | null;
  genreId: number | null;
  shouldShowFavourites: boolean;
  shouldShowFollowedAuthorsArticles: boolean;
  shouldShowPublishedAricles: boolean;
  shouldShowDrafts: boolean;
};

export { type FilterFormValues };
