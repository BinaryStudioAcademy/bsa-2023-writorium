import { logger } from '~/libs/packages/logger/logger.js';
import { socketService } from '~/libs/packages/socket/socket.js';

import { CommentController } from './comment.controller.js';
import { CommentModel } from './comment.model.js';
import { CommentRepository } from './comment.repository.js';
import { CommentService } from './comment.service.js';

const commentRepository = new CommentRepository(CommentModel);
const commentService = new CommentService({
  socketService,
  commentRepository,
});
const commentController = new CommentController(logger, commentService);

export { commentController, commentService };
export { CommentModel } from './comment.model.js';
