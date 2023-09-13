import { type SelectOption } from '~/libs/types/types.js';
import { type GenreGetAllItemResponseDto } from '~/packages/genres/genres.js';
import { type UserDetailsDto } from '~/packages/users/users.js';

const getSelectGenresOptions = (
  genres: GenreGetAllItemResponseDto[],
): SelectOption[] => {
  const selectOptions: SelectOption[] = genres.map((genre) => {
    return { label: genre.name, value: genre.id };
  });
  return selectOptions;
};

const getSelectAuthorsOptions = (authors: UserDetailsDto[]): SelectOption[] => {
  const selectOptions: SelectOption[] = authors.map((author) => {
    return {
      label: `${author.firstName} ${author.lastName}`,
      value: author.id,
    };
  });
  return selectOptions;
};

export { getSelectAuthorsOptions, getSelectGenresOptions };
