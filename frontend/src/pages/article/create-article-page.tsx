import { Layout, PromptGeneration } from '~/libs/components/components.js';

import { ArticleForm } from './components/components.js';

const CreateArticlePage: React.FC = () => (
  <Layout>
    <PromptGeneration />
    <ArticleForm />
  </Layout>
);

export { CreateArticlePage };
