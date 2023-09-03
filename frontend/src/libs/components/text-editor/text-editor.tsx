import { Placeholder } from '@tiptap/extension-placeholder';
import { TextAlign } from '@tiptap/extension-text-align';
import { Underline } from '@tiptap/extension-underline';
import { type EditorOptions } from '@tiptap/react';
import { EditorContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { getValidClassNames, sanitizeHtml } from '~/libs/helpers/helpers.js';
import { useEffect, useFormController } from '~/libs/hooks/hooks.js';

import { ErrorMessage } from '../components.js';
import { Toolbar } from './libs/components/components.js';
import { TEXT_EDITOR_PLACEHOLDER_TEXT } from './libs/constants/constants.js';
import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  errors: FieldErrors<T>;
  name: FieldPath<T>;
};

const extensions = [
  Underline,
  Placeholder.configure({
    placeholder: TEXT_EDITOR_PLACEHOLDER_TEXT,
    emptyNodeClass: styles.placeholder,
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  StarterKit,
];

const TextEditor = <T extends FieldValues>({
  name,
  errors,
  control,
}: Properties<T>): React.ReactNode => {
  const { field } = useFormController({ name, control });

  const error = errors[name]?.message;
  const hasError = Boolean(error);

  const handleEditorUpdate: EditorOptions['onUpdate'] = ({ editor }): void => {
    field.onChange(editor.getHTML());
  };

  const editor = useEditor({
    extensions,
    onUpdate: handleEditorUpdate,
    content: sanitizeHtml(field.value ?? ''),
    editorProps: {
      attributes: {
        class: styles.textEditor,
      },
    },
  });

  useEffect(() => {
    editor?.setOptions({
      editorProps: {
        attributes: {
          class: getValidClassNames(
            styles.textEditor,
            hasError && styles.hasError,
          ),
        },
      },
    });
  }, [hasError, editor]);

  return (
    <div className={styles.textEditorWrapper}>
      {editor && <Toolbar editor={editor} />}
      <EditorContent editor={editor} />
      <ErrorMessage error={error as string} />
    </div>
  );
};

export { TextEditor };
