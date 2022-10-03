import { gql, useQuery } from '@apollo/client';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

import {
  RestaurantData,
  RestaurantDataVariables,
} from '__generatedTypes__/RestaurantData';
import { RESTAURANT_FRAGMENT } from 'fragments';
import { IRestaurantParams } from 'pages/client/Restaurant/interfaces';
import { ReturnComponentType } from 'types';

const RESTAURANT_QUERY = gql`
  query RestaurantData($input: RestaurantInput!) {
    restaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const Restaurant = (): ReturnComponentType => {
  const params = useParams<IRestaurantParams>();

  const { data } = useQuery<RestaurantData, RestaurantDataVariables>(RESTAURANT_QUERY, {
    variables: {
      input: {
        restarauntId: +params.id!,
      },
    },
  });

  console.log(data, params.id);

  return (
    <>
      <Helmet>
        <title>{data?.restaurant.restaurant?.name || ''} | Nuber Eats</title>
      </Helmet>
      <div
        className="w-full bg-gray-800 bg-center bg-cover py-48"
        style={{
          backgroundImage: `url(${data?.restaurant.restaurant?.coverImage})`,
        }}
      >
        <div className="bg-white w-4/12 py-8 pl-48">
          <h4 className="text-4xl mb-3">{data?.restaurant.restaurant?.name}</h4>
          <h5 className="text-sm font-light mb-2">
            {data?.restaurant.restaurant?.category?.name}
          </h5>
          <h6 className="text-sm font-light">{data?.restaurant.restaurant?.address}</h6>
        </div>
      </div>
    </>
  );
};
