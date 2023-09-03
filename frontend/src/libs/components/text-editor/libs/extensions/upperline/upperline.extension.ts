import { type CommandProps } from '@tiptap/react';
import { Mark, mergeAttributes } from '@tiptap/react';

import { UPPERLINE_EXTENTION_NAME } from './libs/constants/constants.js';
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
  return commands.setMark(UPPERLINE_EXTENTION_NAME);
};

const toggleUpperline = ({ commands }: CommandProps): boolean => {
  return commands.toggleMark(UPPERLINE_EXTENTION_NAME);
};

const unsetUpperline = ({ commands }: CommandProps): boolean => {
  return commands.unsetMark(UPPERLINE_EXTENTION_NAME);
};

const Upperline = Mark.create<UpperlineOptions>({
  name: UPPERLINE_EXTENTION_NAME,

  addOptions() {
    return {
      HTMLAttributes: {
        style: 'text-decoration: overline;',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span',
        style: 'text-decoration=overline',
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
      toggleUpperline: (): typeof toggleUpperline => toggleUpperline,
      unsetUpperline: (): typeof unsetUpperline => unsetUpperline,
    };
  },
});

export { Upperline };
