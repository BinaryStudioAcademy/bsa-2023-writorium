import { type BaseSyntheticEvent, type FC } from 'react';

import { Button, Input } from '~/libs/components/components.js';
import { ButtonType } from '~/libs/enums/enums.js';
import { useAppForm, useCallback } from '~/libs/hooks/hooks.js';
import {
  type CommentBaseRequestDto,
  commentCreateValidationSchema,
} from '~/packages/comments/comments.js';

type Properties = {
  onSubmit: (payload: Omit<CommentBaseRequestDto, 'articleId'>) => void;
};

const CommentForm: FC<Properties> = ({ onSubmit }) => {
  const { control, errors, handleSubmit, handleReset, isDirty, isSubmitting } =
    useAppForm<Omit<CommentBaseRequestDto, 'articleId'>>({
      defaultValues: {
        text: '',
      },
      validationSchema: commentCreateValidationSchema,
    });

  const handleCreateComment = useCallback(
    (event_: BaseSyntheticEvent): void => {
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
      <Button
        label="Send"
        type={ButtonType.SUBMIT}
        disabled={!isDirty || isSubmitting}
      />
    </form>
  );
};

export { CommentForm };
