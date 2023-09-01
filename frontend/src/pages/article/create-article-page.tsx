import { Layout, PromptGeneration } from '~/libs/components/components.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
} from '~/libs/hooks/hooks.js';
import { PromptType } from '~/packages/prompts/libs/enums/enums.js';
import { actions as promptsActions } from '~/slices/prompts/prompts.js';

import { ArticleForm } from './components/components.js';

const CreateArticlePage: React.FC = () => {
  const { generatedPrompt } = useAppSelector(({ prompts }) => ({
    generatedPrompt: prompts.generatedPrompt,
  }));

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (generatedPrompt) {
      void dispatch(
        promptsActions.createPrompt({
          type: PromptType.MANUAL,
          ...generatedPrompt,
        }),
      );
    }
  }, [dispatch, generatedPrompt]);

  return (
    <Layout>
      <PromptGeneration />
      <ArticleForm />
    </Layout>
  );
};

export { CreateArticlePage };
