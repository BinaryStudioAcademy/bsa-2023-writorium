type Position =
  | Record<'left' | 'top', number>
  | Record<'left' | 'bottom', number>
  | Record<'right' | 'top', number>
  | Record<'right' | 'bottom', number>;

export { type Position };
