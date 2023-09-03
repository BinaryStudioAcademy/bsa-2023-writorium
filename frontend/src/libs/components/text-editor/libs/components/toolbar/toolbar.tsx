import { type Editor } from '@tiptap/react';
import { type ValueOf } from 'shared/build/index.js';

import { useCallback } from '~/libs/hooks/hooks.js';

import {
  HEADER_BUTTONS,
  LIST_BUTTONS,
  TEXT_ALIGNMENT_BUTTONS,
  TEXT_DECORATION_BUTTONS,
  TEXT_STYLE_BUTTONS,
} from '../../constants/constants.js';
import { type HeaderLevel, type TextAlignment } from '../../enums/enums.js';
import { ListType, TextDecoration, TextStyle } from '../../enums/enums.js';
import { ToggleButtonsGroup } from '../toggle-buttons-group/toggle-buttons-group.js';
import styles from './styles.module.scss';

type Properties = {
  editor: Editor;
};

const Toolbar: React.FC<Properties> = ({ editor }) => {
  const handleTextAlignmentChange = useCallback(
    (alignment: ValueOf<typeof TextAlignment>) => {
      editor.chain().focus().setTextAlign(alignment).run();
    },
    [editor],
  );

  const handleTextStyleChange = useCallback(
    (style: ValueOf<typeof TextStyle>) => {
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
    (decoration: ValueOf<typeof TextDecoration>) => {
      const commandsMapper = {
        [TextDecoration.STRIKE_THROUGH]: 'toggleStrike',
        [TextDecoration.UNDERLINE]: 'toggleUnderline',
        [TextDecoration.UPPERLINE]: 'toggleUpperline',
      } as const;

      const command = commandsMapper[decoration];

      editor.chain().focus()[command]().run();
    },
    [editor],
  );

  const handleToggleList = useCallback(
    (listType: ValueOf<typeof ListType>) => {
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
    (level: ValueOf<typeof HeaderLevel>) => {
      editor.chain().focus().toggleHeading({ level }).run();
    },
    [editor],
  );

  return (
    <div className={styles.toolbar}>
      <ToggleButtonsGroup
        buttons={TEXT_ALIGNMENT_BUTTONS}
        onButtonClick={handleTextAlignmentChange}
        isButtonActive={(key): boolean => editor.isActive({ textAlign: key })}
      />
      <ToggleButtonsGroup
        buttons={TEXT_STYLE_BUTTONS}
        onButtonClick={handleTextStyleChange}
        isButtonActive={(key): boolean => editor.isActive(key)}
      />
      <ToggleButtonsGroup
        buttons={TEXT_DECORATION_BUTTONS}
        onButtonClick={handleTextDecorationChange}
        isButtonActive={(key): boolean => editor.isActive(key)}
      />
      <ToggleButtonsGroup
        buttons={LIST_BUTTONS}
        onButtonClick={handleToggleList}
        isButtonActive={(key): boolean => editor.isActive(key)}
      />
      <ToggleButtonsGroup
        buttons={HEADER_BUTTONS}
        onButtonClick={handleToggleHeader}
        isButtonActive={(key): boolean =>
          editor.isActive('heading', { level: key })
        }
      />
    </div>
  );
};

export { Toolbar };
