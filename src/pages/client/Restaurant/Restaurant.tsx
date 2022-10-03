import { gql, useQuery } from '@apollo/client';
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

  return <h1>Restaurant</h1>;
};
