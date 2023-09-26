type FilterFormValues = {
  titleFilter: string;
  authorId: number | null;
  genreId: number | null;
  shouldShowFavourites: boolean;
  shouldShowFollowedAuthorsArticles?: boolean;
};

export { type FilterFormValues };
