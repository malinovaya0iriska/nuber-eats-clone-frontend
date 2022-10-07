import { FC } from 'react';

import { gql, useQuery } from '@apollo/client';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import { myRestaurants } from '__generatedTypes__/myRestaurants';
import { RESTAURANT_FRAGMENT } from 'fragments';
import { Paths } from 'routes/constants';

const MY_RESTAURANTS_QUERY = gql`
  query myRestaurants($input: MyRestaurantsInput!) {
    myRestaurants(input: $input) {
      ok
      error
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const MyRestaurants: FC = () => {
  const { data } = useQuery<myRestaurants>(MY_RESTAURANTS_QUERY, {
    variables: {
      input: {
        page: 2,
      },
    },
  });

  return (
    <div className="h-screen">
      <Helmet>
        <title>My Restaurants | Nuber Eats</title>
      </Helmet>
      <div className="max-w-screen-2xl mx-auto mt-32">
        <h2 className="text-4xl font-medium mb-10">My Restaurants</h2>
        {data?.myRestaurants.ok && data.myRestaurants.restaurants?.length === 0 && (
          <>
            <h4 className="text-xl mb-5">You have no restaurants.</h4>
            <Link className="text-lime-600 hover:underline" to={Paths.AddRestaurant}>
              Create one &rarr;
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
