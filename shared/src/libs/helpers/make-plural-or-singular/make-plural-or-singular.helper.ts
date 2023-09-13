const makePluralOrSingular = (text: string, count: number): string => {
  const SINGULAR_UNIT = 1;
  const PLURAL_ENDING = 's';
  const SINGULAR_ENDING = '';

  const isSingular = count === SINGULAR_UNIT;

  return `${text}${isSingular ? SINGULAR_ENDING : PLURAL_ENDING}`;
};

export { makePluralOrSingular };
