import { FC } from 'react';

import { IDishProps } from 'components/Dish/interface';

export const Dish: FC<IDishProps> = ({ description, name, price }) => {
  return (
    <div className=" px-8 py-4 border cursor-pointer hover:border-gray-800 transition-all ">
      <div className="mb-5">
        <h3 className="text-lg font-medium ">{name}</h3>
        <h4 className="font-medium">{description}</h4>
      </div>
      <span>${price}</span>
    </div>
  );
};
