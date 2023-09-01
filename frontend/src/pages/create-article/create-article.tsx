import { Layout, PromptGeneration } from '~/libs/components/components.js';

import { ArticleForm } from './components/components.js';

const CreateArticle: React.FC = () => {
  return (
    <Layout>
      <PromptGeneration />
      <ArticleForm />
    </Layout>
  );
};

export { CreateArticle };
