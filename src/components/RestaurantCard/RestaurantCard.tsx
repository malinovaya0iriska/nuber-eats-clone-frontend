import { FC } from 'react';

import { Link } from 'react-router-dom';

import { IRestaurantCardProps } from 'components/RestaurantCard/interfaces';
import { Paths } from 'routes/constants';

export const RestaurantCard: FC<IRestaurantCardProps> = ({
  id,
  coverImage,
  name,
  categoryName,
}) => (
  <Link to={`${Paths.Restaurants}/${id}`}>
    <div className="flex flex-col">
      <div
        style={{ backgroundImage: `url(${coverImage})` }}
        className="bg-cover bg-center mb-3 py-28 bg-slate-500"
      />
      <h3 className="text-xl">{name}</h3>
      <span className="border-t mt-2 py-2 text-xs opacity-50 border-gray-400">
        {categoryName}
      </span>
    </div>
  </Link>
);
