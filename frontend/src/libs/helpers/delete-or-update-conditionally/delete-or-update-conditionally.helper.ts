type Item = {
  id: number;
};

type Arguments<T> = {
  items: T[];
  itemToDeleteOrUpdate: T;
  hasToDelete: boolean;
};

const deleteOrUpdateConditionally = <T extends Item>({
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

export { deleteOrUpdateConditionally };
