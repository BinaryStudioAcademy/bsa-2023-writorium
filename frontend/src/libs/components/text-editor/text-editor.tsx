import { Placeholder } from '@tiptap/extension-placeholder';
import { TextAlign } from '@tiptap/extension-text-align';
import { Underline } from '@tiptap/extension-underline';
import { type EditorOptions } from '@tiptap/react';
import { EditorContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';

import { sanitizeHtml } from '~/libs/helpers/helpers.js';

import { Toolbar } from './libs/components/components.js';
import { TEXT_EDITOR_PLACEHOLDER_TEXT } from './libs/constants/constants.js';
import styles from './styles.module.scss';

type Properties = {
  content?: string;
  onUpdate?: (content: string) => void;
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

const TextEditor: React.FC<Properties> = ({ content, onUpdate }) => {
  const handleEditorUpdate: EditorOptions['onUpdate'] = ({ editor }): void => {
    onUpdate?.(editor.getHTML());
  };

  const editor = useEditor({
    extensions,
    onUpdate: handleEditorUpdate,
    content: sanitizeHtml(content ?? ''),
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
