import { type Editor } from '@tiptap/react';
import { useCallback } from 'react';
import { type ValueOf } from 'shared/build/index.js';

import { TextAlignment, TextDecoration, TextStyle } from '../../enums/enums.js';
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

  const handleTextDecorationChange = useCallback(
    (decoration: ValueOf<typeof TextDecoration>) => () => {
      const command = {
        [TextDecoration.STRIKE_THROUGH]: 'toggleStrike',
        [TextDecoration.UNDERLINE]: 'toggleUnderline',
      } as const;

      editor.chain().focus()[command[decoration]]().run();
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

  const textDecorationButtons: (Pick<ToggleButtonProperties, 'icon'> & {
    key: ValueOf<typeof TextDecoration>;
  })[] = [
    { icon: 'textStrikeThrough', key: TextDecoration.STRIKE_THROUGH },
    { icon: 'textUnderline', key: TextDecoration.UNDERLINE },
  ];

  return (
    <div className={styles.toolbar}>
      <ToggleButtonsGroup className={styles.textAlignmentButtons}>
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
      <ToggleButtonsGroup className={styles.textStyleButtons}>
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
      <ToggleButtonsGroup>
        {textDecorationButtons.map(({ icon, key }) => {
          return (
            <ToggleButtonsGroup.Button
              key={key}
              icon={icon}
              isActive={editor.isActive(key)}
              onClick={handleTextDecorationChange(key)}
            />
          );
        })}
      </ToggleButtonsGroup>
    </div>
  );
};

export { Toolbar };
