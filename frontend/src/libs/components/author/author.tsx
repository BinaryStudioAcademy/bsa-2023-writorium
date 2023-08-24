import { type FC } from 'react';

import { Avatar } from '../avatar/avatar.jsx';
import styles from './styles.module.scss';

type Properties = {
  name?: string;
  followers?: number;
  rating?: number;
  date?: string;
  readingTime?: string;
  genre?: string;
};

const Author: FC<Properties> = ({
  name = 'Todd Demoer',
  followers = 10,
  rating = 700,
  date = 'May 28',
  readingTime = '7 min',
  genre = 'Fiction',
}) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.avatar_wrpr}>
          <Avatar username={name} avatarUrl={null} />
        </div>
        <div>
          <h1>{name}</h1>
          <div>
            <span>{followers}following</span>
            <span>{rating}rating</span>
          </div>
        </div>
      </div>
      <div>
        <div>
          <span>{date}</span>
          <span>{readingTime}</span>
        </div>
        <h2>{genre}</h2>
      </div>
    </>
  );
};

export { Author };
