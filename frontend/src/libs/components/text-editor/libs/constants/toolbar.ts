import { type ValueOf } from 'shared/build';

import {
  HeaderLevel,
  ListType,
  TextAlignment,
  TextDecoration,
  TextStyle,
} from '../enums/enums.js';
import { type ToolbarButtonProperties } from '../types/types.js';

const TEXT_ALIGNMENT_BUTTONS: ToolbarButtonProperties<
  ValueOf<typeof TextAlignment>
>[] = [
  { icon: 'textAlignLeft', key: TextAlignment.LEFT },
  { icon: 'textAlignCenter', key: TextAlignment.CENTER },
  { icon: 'textAlignRight', key: TextAlignment.RIGHT },
  { icon: 'textAlignJustify', key: TextAlignment.JUSTIFY },
];

const TEXT_STYLE_BUTTONS: ToolbarButtonProperties<ValueOf<typeof TextStyle>>[] =
  [
    { icon: 'textBold', key: TextStyle.BOLD },
    { icon: 'textItalic', key: TextStyle.ITALIC },
  ];

const TEXT_DECORATION_BUTTONS: ToolbarButtonProperties<
  ValueOf<typeof TextDecoration>
>[] = [
  { icon: 'textStrikeThrough', key: TextDecoration.STRIKE_THROUGH },
  { icon: 'textUnderline', key: TextDecoration.UNDERLINE },
];

const LIST_BUTTONS: ToolbarButtonProperties<ValueOf<typeof ListType>>[] = [
  { icon: 'listNumbered', key: ListType.ORDERED },
  { icon: 'listBulleted', key: ListType.BULLETED },
];

const HEADER_BUTTONS: ToolbarButtonProperties<ValueOf<typeof HeaderLevel>>[] = [
  { icon: 'header1', key: HeaderLevel.ONE },
  { icon: 'header2', key: HeaderLevel.TWO },
  { icon: 'header3', key: HeaderLevel.THREE },
  { icon: 'header4', key: HeaderLevel.FOUR },
  { icon: 'header5', key: HeaderLevel.FIVE },
  { icon: 'header6', key: HeaderLevel.SIX },
];

export {
  HEADER_BUTTONS,
  LIST_BUTTONS,
  TEXT_ALIGNMENT_BUTTONS,
  TEXT_DECORATION_BUTTONS,
  TEXT_STYLE_BUTTONS,
};
