import { type CommandProps } from '@tiptap/react';
import { Mark, mergeAttributes } from '@tiptap/react';

import { ExtensionName } from '../libs/enums/enums.js';
import { type UpperlineOptions } from './libs/types/types.js';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    upperline: {
      setUpperline: () => ReturnType;
      unsetUpperline: () => ReturnType;
      toggleUpperline: () => ReturnType;
    };
  }
}

const setUpperline = ({ commands }: CommandProps): boolean => {
  return commands.setMark(ExtensionName.UPPERLINE);
};

const toggleUpperline = ({ commands }: CommandProps): boolean => {
  return commands.toggleMark(ExtensionName.UPPERLINE);
};

const unsetUpperline = ({ commands }: CommandProps): boolean => {
  return commands.unsetMark(ExtensionName.UPPERLINE);
};

const Upperline = Mark.create<UpperlineOptions>({
  name: ExtensionName.UPPERLINE,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      style: {
        default: null,
        renderHTML: (): { style: string } => ({
          style: 'text-decoration: overline',
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span',
        getAttrs: (node): false | null => {
          return (
            node instanceof HTMLElement &&
            node.style.textDecoration === 'overline' &&
            null
          );
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      setUpperline: (): typeof setUpperline => setUpperline,
      unsetUpperline: (): typeof unsetUpperline => unsetUpperline,
      toggleUpperline: (): typeof toggleUpperline => toggleUpperline,
    };
  },
});

export { Upperline };
