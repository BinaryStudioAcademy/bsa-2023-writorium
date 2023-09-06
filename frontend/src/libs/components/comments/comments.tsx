import { CommentCard } from '../comment-card/comment-card.js';
import styles from './styles.module.scss';

const MOCKED_USER = {
  id: 5,
  email: 'jackson@gmail.com',
  firstName: 'Jackson',
  lastName: 'Botosh',
  avatarUrl: null,
  avatarId: null,
};

const MOCKED_COMMENT = {
  id: 1,
  userId: 5,
  articleId: 1,
  text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Semper arcu natoque ultricies
  lobortis sit sit vulputate. Commodo dictumst neque in ultricies eros sed iaculis eget. Netus
  fames vulputate vitae nunc, orci ut. Vitae, neque, pharetra imperdiet nunc, commodo at.
  Ultrices nibh sit a justo ac.`,
  createdAt: '2023-09-04T07:51:23.543Z',
};

const Comments: React.FC = () => (
  <div className={styles.container}>
    <CommentCard user={MOCKED_USER} comment={MOCKED_COMMENT} />
  </div>
);

export { Comments };
