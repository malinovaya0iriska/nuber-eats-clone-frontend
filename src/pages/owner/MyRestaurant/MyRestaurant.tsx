import { gql, useQuery } from '@apollo/client';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';

import { myRestaurant, myRestaurantVariables } from '__generatedTypes__/myRestaurant';
import { RESTAURANT_FRAGMENT } from 'fragments';
import { DISH_FRAGMENT } from 'fragments/dish';
import { IParams } from 'pages/owner/MyRestaurant/interfaces';
import { Paths } from 'routes/constants';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const MY_RESTAURANT_QUERY = gql`
  query myRestaurant($input: MyRestaurantInput!) {
    myRestaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
        menu {
          ...DishParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
`;

export const MyRestaurant = (): ReturnComponentType => {
  const { id } = useParams<IParams>();
  const { data } = useQuery<myRestaurant, myRestaurantVariables>(MY_RESTAURANT_QUERY, {
    variables: {
      input: {
        id: +id!,
      },
    },
  });

  return (
    <div className="w-full">
      <Helmet>
        <title> Restaurant | Nuber Eats</title>
      </Helmet>
      <div
        className="bg-gray-700  py-28 bg-center bg-cover"
        style={{
          backgroundImage: `url(${data?.myRestaurant.restaurant?.coverImage})`,
        }}
      />
      <div className="container mt-10 pl-6">
        <h2 className="text-4xl font-medium mb-10">
          {data?.myRestaurant.restaurant?.name || 'Loading...'}
        </h2>
        <Link
          to={`${Paths.Restaurants}/${id}${Paths.AddDish}`}
          className="mr-8 text-white bg-gray-800 py-3 px-10"
        >
          Add Dish &rarr;
        </Link>
        <Link to="/" className="text-white bg-lime-700 py-3 px-10">
          Buy Promotion &rarr;
        </Link>
        <div className="mt-10">
          {data?.myRestaurant.restaurant?.menu.length === 0 ? (
            <h4 className="text-xl mb-5">Please upload a dish!</h4>
          ) : null}
        </div>
      </div>
    </div>
  );
};
