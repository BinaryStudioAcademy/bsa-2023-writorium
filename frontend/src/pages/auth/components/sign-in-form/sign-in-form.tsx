import { Button , PromptGeneration } from '~/libs/components/components.js';

type Properties = {
  onSubmit: () => void;
};

const SignInForm: React.FC<Properties> = () => (
  <>
    <h1>Sign In</h1>
    <form>
      <Button label="Sign in" />
    </form>
    {/* TODO: Remove before PR */}
    <PromptGeneration /> 
  </>
);

export { SignInForm };
