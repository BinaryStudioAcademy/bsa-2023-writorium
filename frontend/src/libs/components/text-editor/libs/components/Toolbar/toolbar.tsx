import { type Editor } from '@tiptap/react';
import { useCallback } from 'react';
import { type ValueOf } from 'shared/build/index.js';

import {
  HEADER_BUTTONS,
  LIST_BUTTONS,
  TEXT_ALIGNMENT_BUTTONS,
  TEXT_DECORATION_BUTTONS,
  TEXT_STYLE_BUTTONS,
} from '../../constants/toolbar.js';
import { type HeaderLevel, type TextAlignment } from '../../enums/enums.js';
import { ListType, TextDecoration, TextStyle } from '../../enums/enums.js';
import { ToggleButtonsGroup } from '../toggle-buttons-group/toggle-buttons-group.js';
import styles from './styles.module.scss';

type Properties = {
  editor: Editor;
};

const Toolbar: React.FC<Properties> = ({ editor }) => {
  const handleTextAlignmentChange = useCallback(
    (alignment: ValueOf<typeof TextAlignment>) => () => {
      editor.chain().focus().setTextAlign(alignment).run();
    },
    [editor],
  );

  const handleTextStyleChange = useCallback(
    (style: ValueOf<typeof TextStyle>) => () => {
      const commandsMapper = {
        [TextStyle.BOLD]: 'toggleBold',
        [TextStyle.ITALIC]: 'toggleItalic',
      } as const;

      const command = commandsMapper[style];

      editor.chain().focus()[command]().run();
    },
    [editor],
  );

  const handleTextDecorationChange = useCallback(
    (decoration: ValueOf<typeof TextDecoration>) => () => {
      const commandsMapper = {
        [TextDecoration.STRIKE_THROUGH]: 'toggleStrike',
        [TextDecoration.UNDERLINE]: 'toggleUnderline',
      } as const;

      const command = commandsMapper[decoration];

      editor.chain().focus()[command]().run();
    },
    [editor],
  );

  const handleToggleList = useCallback(
    (listType: ValueOf<typeof ListType>) => () => {
      const commandsMapper = {
        [ListType.ORDERED]: 'toggleOrderedList',
        [ListType.BULLETED]: 'toggleBulletList',
      } as const;

      const command = commandsMapper[listType];

      editor.chain().focus()[command]().run();
    },
    [editor],
  );

  const handleToggleHeader = useCallback(
    (level: ValueOf<typeof HeaderLevel>) => () => {
      editor.chain().focus().toggleHeading({ level }).run();
    },
    [editor],
  );

  return (
    <div className={styles.toolbar}>
      <ToggleButtonsGroup>
        {TEXT_ALIGNMENT_BUTTONS.map(({ icon, key }) => {
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
        {TEXT_STYLE_BUTTONS.map(({ icon, key }) => {
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
        {TEXT_DECORATION_BUTTONS.map(({ icon, key }) => {
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
      <ToggleButtonsGroup>
        {LIST_BUTTONS.map(({ icon, key }) => {
          return (
            <ToggleButtonsGroup.Button
              key={key}
              icon={icon}
              isActive={editor.isActive(key)}
              onClick={handleToggleList(key)}
            />
          );
        })}
      </ToggleButtonsGroup>
      <ToggleButtonsGroup>
        {HEADER_BUTTONS.map(({ icon, key }) => {
          return (
            <ToggleButtonsGroup.Button
              key={key}
              icon={icon}
              isActive={editor.isActive('heading', { level: key })}
              onClick={handleToggleHeader(key)}
            />
          );
        })}
      </ToggleButtonsGroup>
    </div>
  );
};

export { Toolbar };
