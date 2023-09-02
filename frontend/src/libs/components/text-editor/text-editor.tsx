import { Placeholder } from '@tiptap/extension-placeholder';
import { TextAlign } from '@tiptap/extension-text-align';
import { Underline } from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';

import { Toolbar } from './libs/components/components.js';
import { TEXT_EDITOR_PLACEHOLDER_TEXT } from './libs/constants/constants.js';
import styles from './styles.module.scss';

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

const TextEditor = (): React.ReactNode => {
  const editor = useEditor({
    extensions,
    editorProps: {
      attributes: { class: styles.textEditor },
    },
  });

  return (
    <div className={styles.textEditorWrapper}>
      {editor && <Toolbar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
};

export { TextEditor };
