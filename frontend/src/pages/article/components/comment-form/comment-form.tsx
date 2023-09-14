import { type BaseSyntheticEvent, type FC } from 'react';

import { Button, Input } from '~/libs/components/components.js';
import { ButtonType } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useAppForm, useCallback } from '~/libs/hooks/hooks.js';
import {
  type CommentBaseRequestDto,
  commentCreateValidationSchema,
} from '~/packages/comments/comments.js';

import styles from './style.module.scss';

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
        type={ButtonType.SUBMIT}
        label="Send"
        disabled={!isDirty || isSubmitting}
        className={getValidClassNames(styles.button)}
      />
    </form>
  );
};

export { CommentForm };
