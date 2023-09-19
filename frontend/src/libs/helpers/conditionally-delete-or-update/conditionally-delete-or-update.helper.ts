type ItemType = {
  id: number;
};

type Arguments<T> = {
  items: T[];
  itemToDeleteOrUpdate: T;
  hasToDelete: boolean;
};

const conditionallyDeleteOrUpdate = <T extends ItemType>({
  items,
  itemToDeleteOrUpdate,
  hasToDelete,
}: Arguments<T>): T[] => {
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
