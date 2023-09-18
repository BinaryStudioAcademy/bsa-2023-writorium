type ItemType = {
  id: number;
};

const conditionallyDeleteOrUpdate = <T extends ItemType>(
  items: T[],
  itemToDeleteOrUpdate: T,
  hasToDelete: boolean,
): T[] => {
  return hasToDelete
    ? items.filter((item) => item.id !== itemToDeleteOrUpdate.id)
    : items.map((item) => {
        if (itemToDeleteOrUpdate.id === item.id) {
          return itemToDeleteOrUpdate;
        }
        return item;
      });
};

export { conditionallyDeleteOrUpdate };
