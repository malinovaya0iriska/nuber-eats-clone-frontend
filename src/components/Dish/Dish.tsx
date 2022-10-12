import { FC } from 'react';

import { IDishProps } from 'components/Dish/interface';

export const Dish: FC<IDishProps> = ({
  description,
  name,
  price,
  isCustomer = false,
  options,
}) => {
  return (
    <div className=" px-8 py-4 border cursor-pointer hover:border-gray-800 transition-all ">
      <div className="mb-5">
        <h3 className="text-lg font-medium ">{name}</h3>
        <h4 className="font-medium">{description}</h4>
      </div>
      <span>${price}</span>
      {isCustomer && options && options?.length !== 0 && (
        <div>
          <h5 className="mt-8 mb-3 font-medium">Dish Options:</h5>
          {options?.map(({ name, extra }) => (
            <span className="flex items-center" key={name}>
              <h6 className="mr-2">{name}</h6>
              <h6 className="text-sm opacity-75">(${extra})</h6>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
