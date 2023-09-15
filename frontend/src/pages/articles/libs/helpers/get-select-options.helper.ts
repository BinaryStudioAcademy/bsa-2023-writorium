import { getFullName } from '~/libs/helpers/helpers.js';
import { type SelectOption } from '~/libs/types/types.js';
import { type GenreGetAllItemResponseDto } from '~/packages/genres/genres.js';
import { type UserDetailsAuthorResponseDto } from '~/packages/users/users.js';

const getSelectGenresOptions = (
  genres: GenreGetAllItemResponseDto[],
): SelectOption[] => {
  const selectOptions: SelectOption[] = genres.map((genre) => {
    return { label: genre.name, value: genre.id };
  });
  return selectOptions;
};

const getSelectAuthorsOptions = (
  authors: UserDetailsAuthorResponseDto[],
): SelectOption[] => {
  const selectOptions: SelectOption[] = authors.map((author) => {
    return {
      label: getFullName(author.firstName, author.lastName),
      value: author.userId,
    };
  });
  return selectOptions;
};

export { getSelectAuthorsOptions, getSelectGenresOptions };
