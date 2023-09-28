import { type EditorOptions } from '@tiptap/react';
import { EditorContent, useEditor } from '@tiptap/react';
import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { getValidClassNames, sanitizeHtml } from '~/libs/helpers/helpers.js';
import {
  useEffect,
  useFormController,
  useReference,
} from '~/libs/hooks/hooks.js';

import { ErrorMessage } from '../components.js';
import { Toolbar } from './libs/components/components.js';
import { TEXT_EDITOR_PLACEHOLDER_TEXT } from './libs/constants/constants.js';
import {
  FontSize,
  Placeholder,
  StarterKit,
  TextAlign,
  TextStyle,
  Underline,
  Upperline,
} from './libs/extensions/extensions.js';
import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  errors: FieldErrors<T>;
  name: FieldPath<T>;
  wasEdited: boolean;
  initialValue: string;
};

const TextEditor = <T extends FieldValues>({
  name,
  errors,
  control,
  wasEdited,
  initialValue,
}: Properties<T>): React.ReactNode => {
  const { field } = useFormController({ name, control });
  const error = errors[name]?.message;
  const hasError = Boolean(error);

  const handleEditorUpdate: EditorOptions['onUpdate'] = ({ editor }): void => {
    field.onChange(editor.getHTML().replaceAll('<p></p>', '<br>'));
  };

  const wrapperReference = useReference<HTMLDivElement>(null);

  const getWrapperFontSize = (
    wrapper: HTMLDivElement | null,
  ): string | null => {
    if (!wrapper) {
      return null;
    }
    return window.getComputedStyle(wrapper).getPropertyValue('font-size');
  };

  const extensions = [
    Underline,
    Upperline,
    StarterKit,
    TextStyle,
    FontSize.configure({
      baseFontSize: getWrapperFontSize(wrapperReference.current),
    }),
    Placeholder.configure({
      placeholder: TEXT_EDITOR_PLACEHOLDER_TEXT,
      emptyEditorClass: styles.placeholder,
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
  ];

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

  useEffect(() => {
    if (!wasEdited && editor) {
      editor.commands.setContent(initialValue);
    }
  }, [wasEdited, initialValue, editor]);

  return (
    <div className={styles.textEditorWrapper} ref={wrapperReference}>
      {editor && <Toolbar editor={editor} />}
      <EditorContent editor={editor} />
      <ErrorMessage error={error as string} />
    </div>
  );
};

export { TextEditor };
