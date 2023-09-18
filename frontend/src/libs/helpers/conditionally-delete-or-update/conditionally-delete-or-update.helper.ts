type ItemType = {
  id: number;
};

const conditionallyDeleteOrUpdate = <T extends ItemType>(
  condition: boolean,
  dataArray: T[],
  newItem: T,
): T[] => {
  return condition
    ? dataArray.filter((item) => item.id !== newItem.id)
    : dataArray.map((item) => {
        if (newItem.id === item.id) {
          return newItem;
        }
        return item;
      });
};

export { conditionallyDeleteOrUpdate };
