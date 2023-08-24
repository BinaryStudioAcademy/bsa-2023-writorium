import { type FC } from 'react';
import { useParams } from 'react-router-dom';

import { Author } from '~/libs/components/author/author.jsx';

const Article: FC = () => {
  const { id } = useParams();
  return <>{id && <Author />}</>;
};

export { Article };
