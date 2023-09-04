import { type CommandProps } from '@tiptap/react';
import { Mark, mergeAttributes } from '@tiptap/react';

import { UPPERLINE_EXTENSION_NAME } from './libs/constants/constants.js';
import { type UpperlineOptions } from './libs/types/types.js';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    upperline: {
      /**
       * Set an upperline mark
       */
      setUpperline: () => ReturnType;
      /**
       * Toggle an upperline mark
       */
      toggleUpperline: () => ReturnType;
      /**
       * Unset an upperline mark
       */
      unsetUpperline: () => ReturnType;
    };
  }
}

const setUpperline = ({ commands }: CommandProps): boolean => {
  return commands.setMark(UPPERLINE_EXTENSION_NAME);
};

const toggleUpperline = ({ commands }: CommandProps): boolean => {
  return commands.toggleMark(UPPERLINE_EXTENSION_NAME);
};

const unsetUpperline = ({ commands }: CommandProps): boolean => {
  return commands.unsetMark(UPPERLINE_EXTENSION_NAME);
};

const Upperline = Mark.create<UpperlineOptions>({
  name: UPPERLINE_EXTENSION_NAME,

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
