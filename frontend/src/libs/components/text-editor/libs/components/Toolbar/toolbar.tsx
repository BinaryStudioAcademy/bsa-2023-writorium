import { type Editor } from '@tiptap/react';
import { useCallback } from 'react';
import { type ValueOf } from 'shared/build/index.js';

import { TextAlignment, TextStyle } from '../../enums/enums.js';
import { type ToggleButtonProperties } from '../ToggleButtonsGroup/toggle-buttons-group.js';
import { ToggleButtonsGroup } from '../ToggleButtonsGroup/toggle-buttons-group.js';
import styles from './styles.module.scss';

type Properties = {
  editor: Editor;
};

const Toolbar: React.FC<Properties> = ({ editor }) => {
  const handleTextAlignmentChange = useCallback(
    (alignment: string) => () => {
      editor.chain().focus().setTextAlign(alignment).run();
    },
    [editor],
  );

  const handleTextStyleChange = useCallback(
    (style: ValueOf<typeof TextStyle>) => () => {
      const command = {
        [TextStyle.BOLD]: 'toggleBold',
        [TextStyle.ITALIC]: 'toggleItalic',
      } as const;

      editor.chain().focus()[command[style]]().run();
    },
    [editor],
  );

  const textAlignmentButtons: (Pick<ToggleButtonProperties, 'icon'> & {
    key: ValueOf<typeof TextAlignment>;
  })[] = [
    { icon: 'textAlignLeft', key: TextAlignment.LEFT },
    { icon: 'textAlignCenter', key: TextAlignment.CENTER },
    { icon: 'textAlignRight', key: TextAlignment.RIGHT },
    { icon: 'textAlignJustify', key: TextAlignment.JUSTIFY },
  ];

  const textStyleButtons: (Pick<ToggleButtonProperties, 'icon'> & {
    key: ValueOf<typeof TextStyle>;
  })[] = [
    { icon: 'textBold', key: TextStyle.BOLD },
    { icon: 'textItalic', key: TextStyle.ITALIC },
  ];

  return (
    <div className={styles.toolbar}>
      <ToggleButtonsGroup>
        {textAlignmentButtons.map(({ icon, key }) => {
          return (
            <ToggleButtonsGroup.Button
              key={key}
              icon={icon}
              isActive={editor.isActive({ textAlign: key })}
              onClick={handleTextAlignmentChange(key)}
            />
          );
        })}
      </ToggleButtonsGroup>
      <ToggleButtonsGroup>
        {textStyleButtons.map(({ icon, key }) => {
          return (
            <ToggleButtonsGroup.Button
              key={key}
              icon={icon}
              isActive={editor.isActive(key)}
              onClick={handleTextStyleChange(key)}
            />
          );
        })}
      </ToggleButtonsGroup>
    </div>
  );
};

export { Toolbar };
