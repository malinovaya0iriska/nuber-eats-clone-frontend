/* eslint-disable react/no-array-index-key */
import { FC } from 'react';

import { Helmet } from 'react-helmet';

export const MyRestaurants: FC = () => {
  return (
    <div className="h-screen">
      <Helmet>
        <title>My Restaurants | Nuber Eats</title>
      </Helmet>
      <h1>My restaurants</h1>
    </div>
  );
};
