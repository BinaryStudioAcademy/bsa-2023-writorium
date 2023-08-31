import { PromptGeneration } from '~/libs/components/components.js';

import { ArticleForm } from './components/components.js';

const CreateArticle: React.FC = () => {
  return (
    <>
      <PromptGeneration />
      <ArticleForm />
    </>
  );
};

export { CreateArticle };
