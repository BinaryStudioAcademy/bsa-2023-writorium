import { logger } from '~/libs/packages/logger/logger.js';

import { GenreController } from './genre.controller.js';
import { GenreModel } from './genre.model.js';
import { GenreRepository } from './genre.repository.js';
import { GenreService } from './genre.service.js';

const genreRepository = new GenreRepository(GenreModel);
const genreService = new GenreService(genreRepository);
const genreController = new GenreController(logger, genreService);

export { GenreEntity } from './genre.entity.js';
export { GenreModel } from './genre.model.js';
export { genreController, genreRepository, genreService };
