import { ReactComponent as ArrowDown } from '~/assets/img/icons/arrow-down-icon.svg';
import { ReactComponent as ArrowUp } from '~/assets/img/icons/arrow-up-icon.svg';
import { ReactComponent as Bell } from '~/assets/img/icons/bell-icon.svg';
import { ReactComponent as Comment } from '~/assets/img/icons/comment-icon.svg';
import { ReactComponent as CrossMark } from '~/assets/img/icons/cross-mark-icon.svg';
import { ReactComponent as Dislike } from '~/assets/img/icons/dislike-icon.svg';
import { ReactComponent as Favorite } from '~/assets/img/icons/favorite-icon.svg';
import { ReactComponent as ListBulleted } from '~/assets/img/icons/format-list-bulleted-icon.svg';
import { ReactComponent as ListNumbered } from '~/assets/img/icons/format-list-numbered-icon.svg';
import { ReactComponent as TextAlignCenter } from '~/assets/img/icons/format-text-align-center-icon.svg';
import { ReactComponent as TextAlignJustify } from '~/assets/img/icons/format-text-align-justify.svg';
import { ReactComponent as TextAlignLeft } from '~/assets/img/icons/format-text-align-left-icon.svg';
import { ReactComponent as TextAlignRight } from '~/assets/img/icons/format-text-align-right-icon.svg';
import { ReactComponent as TextBold } from '~/assets/img/icons/format-text-bold-icon.svg';
import { ReactComponent as TextItalic } from '~/assets/img/icons/format-text-italic-icon.svg';
import { ReactComponent as TextStrikeThrough } from '~/assets/img/icons/format-text-strike-through-icon.svg';
import { ReactComponent as TextUnderline } from '~/assets/img/icons/format-text-underline-icon.svg';
import { ReactComponent as TextUpperline } from '~/assets/img/icons/format-text-upperline-icon.svg';
import { ReactComponent as Hide } from '~/assets/img/icons/hide-icon.svg';
import { ReactComponent as Image } from '~/assets/img/icons/image-icon.svg';
import { ReactComponent as Like } from '~/assets/img/icons/like-icon.svg';
import { ReactComponent as Link } from '~/assets/img/icons/link-icon.svg';
import { ReactComponent as Notes } from '~/assets/img/icons/notes-icon.svg';
import { ReactComponent as Refresh } from '~/assets/img/icons/refresh-icon.svg';
import { ReactComponent as Renew } from '~/assets/img/icons/renew-icon.svg';
import { ReactComponent as Search } from '~/assets/img/icons/search-icon.svg';
import { ReactComponent as Share } from '~/assets/img/icons/share-icon.svg';
import { ReactComponent as Sparkles } from '~/assets/img/icons/sparkles-icon.svg';
import { ReactComponent as Star } from '~/assets/img/icons/star-icon.svg';
import { ReactComponent as View } from '~/assets/img/icons/view-icon.svg';

type IconName =
  | 'arrowDown'
  | 'arrowUp'
  | 'bell'
  | 'comment'
  | 'crossMark'
  | 'like'
  | 'dislike'
  | 'favorite'
  | 'textAlignLeft'
  | 'textAlignCenter'
  | 'textAlignRight'
  | 'textAlignJustify'
  | 'textBold'
  | 'textItalic'
  | 'textStrikeThrough'
  | 'textUnderline'
  | 'textUpperline'
  | 'hide'
  | 'image'
  | 'link'
  | 'notes'
  | 'refresh'
  | 'renew'
  | 'search'
  | 'share'
  | 'sparkles'
  | 'star'
  | 'view'
  | 'listNumbered'
  | 'listBulleted';

const iconNameToIcon: Record<
  IconName,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  arrowDown: ArrowDown,
  arrowUp: ArrowUp,
  bell: Bell,
  comment: Comment,
  crossMark: CrossMark,
  like: Like,
  dislike: Dislike,
  favorite: Favorite,
  textAlignLeft: TextAlignLeft,
  textAlignCenter: TextAlignCenter,
  textAlignRight: TextAlignRight,
  textBold: TextBold,
  textItalic: TextItalic,
  textStrikeThrough: TextStrikeThrough,
  textUnderline: TextUnderline,
  textUpperline: TextUpperline,
  hide: Hide,
  image: Image,
  link: Link,
  notes: Notes,
  refresh: Refresh,
  renew: Renew,
  search: Search,
  share: Share,
  sparkles: Sparkles,
  star: Star,
  view: View,
  textAlignJustify: TextAlignJustify,
  listBulleted: ListBulleted,
  listNumbered: ListNumbered,
};

export { type IconName, iconNameToIcon };
