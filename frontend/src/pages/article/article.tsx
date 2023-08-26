import { type FC } from 'react';
import { useParams } from 'react-router-dom';

import { Author } from './components/author/author.js';

const Article: FC = () => {
  const { id } = useParams();
  return <>{id && <Author />}</>;
};

export { Article };
