import { Placeholder } from '@tiptap/extension-placeholder';
import { TextAlign } from '@tiptap/extension-text-align';
import { Underline } from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';

import { Toolbar } from './libs/components/components.js';
import styles from './styles.module.scss';

const extensions = [
  StarterKit,
  Underline,
  Placeholder.configure({
    placeholder: 'Write your post content …',
    emptyNodeClass: styles.placeholder,
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
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
