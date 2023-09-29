import { Extension } from '@tiptap/core';

import { type ExtensionName } from '../libs/enums/extension-name.enum.js';
import {
  DEFAULT_INDENT_LEVEL,
  DEFAULT_OPTIONS_TYPES,
  INDENT_LEVELS,
} from './libs/constants/constants.js';
import { IndentProperty } from './libs/enums/enums.js';
import { updateIndentLevel } from './libs/helpers/helpers.js';
import {
  type IndentOptions,
  type IndentParseHTML,
  type IndentRenderHTML,
  type NodeAttributesIndent,
} from './libs/types/types.js';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    [ExtensionName.INDENT]: {
      indent: () => ReturnType;
      outdent: () => ReturnType;
    };
  }
}

const Indent = Extension.create<IndentOptions>({
  name: 'indent',

  defaultOptions: {
    types: DEFAULT_OPTIONS_TYPES,
    indentLevels: [...INDENT_LEVELS],
    defaultIndentLevel: DEFAULT_INDENT_LEVEL,
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          indent: {
            default: this.options.defaultIndentLevel,
            renderHTML: (attributes): IndentRenderHTML => {
              const attributesIndent =
                attributes.indent as NodeAttributesIndent;
              const indent =
                typeof attributesIndent === 'object'
                  ? attributesIndent.indent
                  : attributesIndent;

              return {
                style: `text-indent: ${indent}px;`,
              };
            },
            parseHTML: (element): IndentParseHTML => {
              return {
                indent:
                  Number.parseInt(element.style.textIndent) ||
                  this.options.defaultIndentLevel,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      indent: () => {
        return ({ tr: transaction, state, dispatch, editor }): boolean => {
          const { selection } = state;
          transaction = transaction.setSelection(selection);
          transaction = updateIndentLevel(
            transaction,
            IndentProperty.MORE,
            editor.extensionManager.extensions,
          );

          if (transaction.docChanged) {
            dispatch && dispatch(transaction);
            return true;
          }

          return false;
        };
      },

      outdent: () => {
        return ({ tr: transaction, state, dispatch, editor }): boolean => {
          const { selection } = state;
          if (!selection.$anchor.parentOffset) {
            transaction = transaction.setSelection(selection);
          }
          transaction = updateIndentLevel(
            transaction,
            IndentProperty.LESS,
            editor.extensionManager.extensions,
          );

          if (transaction.docChanged) {
            dispatch && dispatch(transaction);
            return true;
          }

          return false;
        };
      },
    };
  },

  addKeyboardShortcuts() {
    return {
      Tab: (): boolean => this.editor.commands.indent(),
      'Shift-Tab': (): boolean => this.editor.commands.outdent(),
      Backspace: (): boolean => {
        if (this.editor.state.selection.$anchor.parentOffset) {
          return false;
        }
        return this.editor.commands.outdent();
      },
    };
  },
});

export { Indent };
