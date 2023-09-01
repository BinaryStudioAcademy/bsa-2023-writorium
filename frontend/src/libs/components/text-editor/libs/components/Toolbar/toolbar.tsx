import { type Editor } from '@tiptap/react';
import { useCallback } from 'react';
import { type ValueOf } from 'shared/build/index.js';

import { TextAlignment } from '../../enums/text-alignment.js';
import { type ToggleButtonProperties } from '../ToggleButtonsGroup/toggle-buttons-group.js';
import { ToggleButtonsGroup } from '../ToggleButtonsGroup/toggle-buttons-group.js';
import styles from './styles.module.scss';

type Properties = {
  editor: Editor;
};

const Toolbar: React.FC<Properties> = ({ editor }) => {
  const handleToggleTextAlignmentChange = useCallback(
    (alignment: string) => () => {
      editor.chain().focus().setTextAlign(alignment).run();
    },
    [editor],
  );

  const textAlignmentButtons: (Pick<ToggleButtonProperties, 'icon'> & {
    key: ValueOf<typeof TextAlignment>;
  })[] = [
    { icon: 'textAlignLeft', key: TextAlignment.LEFT },
    { icon: 'textAlignLeft', key: TextAlignment.CENTER },
    { icon: 'textAlignLeft', key: TextAlignment.RIGHT },
    { icon: 'textAlignLeft', key: TextAlignment.JUSTIFY },
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
              onClick={handleToggleTextAlignmentChange(key)}
            />
          );
        })}
      </ToggleButtonsGroup>
    </div>
  );
};

export { Toolbar };
