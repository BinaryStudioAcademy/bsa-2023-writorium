import { type ValueOf } from '~/libs/types/types.js';

import {
  HeaderLevel,
  ListType,
  TextAlignment,
  TextDecoration,
  TextSize,
  TextStyle,
} from '../enums/enums.js';
import { type ToolbarButtonProperties } from '../types/types.js';

const TEXT_ALIGNMENT_BUTTONS: ToolbarButtonProperties<
  ValueOf<typeof TextAlignment>
>[] = [
  { iconName: 'textAlignLeft', key: TextAlignment.LEFT },
  { iconName: 'textAlignCenter', key: TextAlignment.CENTER },
  { iconName: 'textAlignRight', key: TextAlignment.RIGHT },
  { iconName: 'textAlignJustify', key: TextAlignment.JUSTIFY },
];

const TEXT_STYLE_BUTTONS: ToolbarButtonProperties<ValueOf<typeof TextStyle>>[] =
  [
    { iconName: 'textBold', key: TextStyle.BOLD },
    { iconName: 'textItalic', key: TextStyle.ITALIC },
  ];

const TEXT_DECORATION_BUTTONS: ToolbarButtonProperties<
  ValueOf<typeof TextDecoration>
>[] = [
  { iconName: 'textStrikeThrough', key: TextDecoration.STRIKE_THROUGH },
  { iconName: 'textUnderline', key: TextDecoration.UNDERLINE },
  { iconName: 'textUpperline', key: TextDecoration.UPPERLINE },
];

const LIST_BUTTONS: ToolbarButtonProperties<ValueOf<typeof ListType>>[] = [
  { iconName: 'listNumbered', key: ListType.ORDERED },
  { iconName: 'listBulleted', key: ListType.BULLETED },
];

const HEADER_BUTTONS: ToolbarButtonProperties<ValueOf<typeof HeaderLevel>>[] = [
  { iconName: 'header1', key: HeaderLevel.ONE },
  { iconName: 'header2', key: HeaderLevel.TWO },
  { iconName: 'header3', key: HeaderLevel.THREE },
  { iconName: 'header4', key: HeaderLevel.FOUR },
  { iconName: 'header5', key: HeaderLevel.FIVE },
  { iconName: 'header6', key: HeaderLevel.SIX },
];

const TEXT_SIZE_BUTTONS: ToolbarButtonProperties<ValueOf<typeof TextSize>>[] = [
  { iconName: 'textSizeIncrease', key: TextSize.INCREASE },
  { iconName: 'textSizeDecrease', key: TextSize.DECREASE },
];

export {
  HEADER_BUTTONS,
  LIST_BUTTONS,
  TEXT_ALIGNMENT_BUTTONS,
  TEXT_DECORATION_BUTTONS,
  TEXT_SIZE_BUTTONS,
  TEXT_STYLE_BUTTONS,
};
