type FilterFormValues = {
  titleFilter: string;
  authorId: number | null;
  genreId: number | null;
  shouldShowFavourites: boolean;
  shouldShowFollowedAuthorsArticles: boolean;
  shouldShowDrafts: boolean;
};

export { type FilterFormValues };
