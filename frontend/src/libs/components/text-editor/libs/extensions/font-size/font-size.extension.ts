import '@tiptap/starter-kit';

import { Extension } from '@tiptap/core';

import { FontSizeConfig } from './libs/constants/constants.js';
import {
  convertFontSizeToNumber,
  decrementFontSize,
  incrementFontSize,
} from './libs/helpers/helpers.js';

type FontSizeOptions = {
  types: string[];
  baseFontSize: string | null;
};

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      incrementFontSize: (attribute: Record<string, string>) => ReturnType;
      decrementFontSize: (attribute: Record<string, string>) => ReturnType;
    };
  }
}

const FontSize = Extension.create<FontSizeOptions>({
  name: 'fontSize',

  addOptions(): FontSizeOptions {
    return {
      types: ['textStyle'],
      baseFontSize: null,
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element): string | null | undefined => { return element.style.fontSize.replaceAll(/["']+/g, ''); },
            renderHTML: (
              attributes,
            ): Record<string, string> | null | undefined => {
              if (!attributes.fontSize) {
                return {};
              }

              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      incrementFontSize:
        (attributes) =>
        ({ chain }): boolean => {
          const fontSize =
            convertFontSizeToNumber(attributes.fontSize) ??
            convertFontSizeToNumber(this.options.baseFontSize) ??
            FontSizeConfig.DEFAULT_FONT_SIZE;

          return chain()
            .setMark('textStyle', {
              fontSize: `${incrementFontSize(fontSize)}px`,
            })
            .run();
        },
      decrementFontSize:
        (attributes) =>
        ({ chain }): boolean => {
          const fontSize =
            convertFontSizeToNumber(attributes.fontSize) ??
            FontSizeConfig.DEFAULT_FONT_SIZE;

          return chain()
            .setMark('textStyle', {
              fontSize: `${decrementFontSize(fontSize)}px`,
            })
            .removeEmptyTextStyle()
            .run();
        },
    };
  },
});

export { FontSize };
