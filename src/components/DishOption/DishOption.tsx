import { FC } from 'react';

import { IDishOptionProps } from 'components/DishOption/interface';

export const DishOption: FC<IDishOptionProps> = ({
  isSelected,
  name,
  extra,
  addOptionToItem,
  removeOptionFromItem,
  dishId,
}) => {
  const onClick = (): void => {
    if (isSelected) {
      removeOptionFromItem(dishId, name);
    } else {
      addOptionToItem(dishId, name);
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`border px-2 mt-2 ${
        isSelected ? 'border-gray-800' : 'hover:border-gray-800'
      }`}
    >
      <span className="mr-2">{name}</span>
      <span className="text-sm opacity-75">(${extra})</span>
    </button>
  );
};
