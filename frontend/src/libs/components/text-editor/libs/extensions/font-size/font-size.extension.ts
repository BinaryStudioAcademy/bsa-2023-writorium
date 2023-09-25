import '@tiptap/starter-kit';

import { Extension } from '@tiptap/core';

import { ExtensionName } from '../libs/enums/enums.js';
import { EXTENSION_OPTION_TYPE } from './libs/constants/constants.js';
import { FontSizeConfig } from './libs/enums/enums.js';
import {
  convertFontSizeToNumber,
  decrementFontSize,
  incrementFontSize,
} from './libs/helpers/helpers.js';
import { type RenderedHTML } from './libs/types/types.js';

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
  name: ExtensionName.FONT_SIZE,

  addOptions(): FontSizeOptions {
    return {
      types: [EXTENSION_OPTION_TYPE],
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
            parseHTML: (element): string | null | undefined => {
              return element.style.fontSize.replaceAll(/["']+/g, '');
            },
            renderHTML: (attributes): RenderedHTML => {
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
            .setMark(EXTENSION_OPTION_TYPE, {
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
            .setMark(EXTENSION_OPTION_TYPE, {
              fontSize: `${decrementFontSize(fontSize)}px`,
            })
            .removeEmptyTextStyle()
            .run();
        },
    };
  },
});

export { FontSize };
