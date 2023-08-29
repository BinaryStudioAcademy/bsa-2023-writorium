import { type FC } from 'react';

import { useParams } from '~/libs/hooks/hooks.js';

import { Author } from './components/author/author.js';

const Article: FC = () => {
  const { id } = useParams();
  return <>{id && <Author />}</>;
};

export { Article };
