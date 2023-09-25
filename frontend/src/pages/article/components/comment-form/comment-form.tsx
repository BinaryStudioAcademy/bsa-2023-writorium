import { Button, Input } from '~/libs/components/components.js';
import { useAppForm, useCallback } from '~/libs/hooks/hooks.js';
import { type ReactBaseSyntheticEvent } from '~/libs/types/types.js';
import {
  type CommentBaseRequestDto,
  commentCreateValidationSchema,
} from '~/packages/comments/comments.js';

type Properties = {
  onSubmit: (payload: Omit<CommentBaseRequestDto, 'articleId'>) => void;
};

const CommentForm: React.FC<Properties> = ({ onSubmit }) => {
  const { control, errors, handleSubmit, handleReset, isDirty, isSubmitting } =
    useAppForm<Omit<CommentBaseRequestDto, 'articleId'>>({
      defaultValues: {
        text: '',
      },
      validationSchema: commentCreateValidationSchema,
    });

  const handleCreateComment = useCallback(
    (event_: ReactBaseSyntheticEvent): void => {
      void handleSubmit(onSubmit)(event_);
      handleReset();
    },
    [handleReset, handleSubmit, onSubmit],
  );

  return (
    <form onSubmit={handleCreateComment}>
      <Input
        placeholder="Add to the discussion..."
        name="text"
        control={control}
        errors={errors}
        rows={4}
      />
      <Button label="Send" type="submit" disabled={!isDirty || isSubmitting} />
    </form>
  );
};

export { CommentForm };
