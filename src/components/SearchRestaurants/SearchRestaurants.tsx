import { FC, useEffect } from 'react';

import { gql, useLazyQuery } from '@apollo/client';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  SearchRestaurant,
  SearchRestaurantVariables,
} from '__generatedTypes__/SearchRestaurant';
import { ONE } from 'constants/index';
import { RESTAURANT_FRAGMENT } from 'fragments';
import { BASE_URL } from 'routes/constants';

const SEARCH_RESTAURANT = gql`
  query SearchRestaurant($input: SearchRestaurantInput!) {
    searchRestaurant(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const SearchRestaurants: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [callQuery, { loading, data, called }] = useLazyQuery<
    SearchRestaurant,
    SearchRestaurantVariables
  >(SEARCH_RESTAURANT);

  useEffect(() => {
    const [, query] = location.search.split('?term=');

    if (!query) {
      return navigate(BASE_URL);
    }
    callQuery({
      variables: {
        input: {
          page: ONE,
          query,
        },
      },
    });
  }, [navigate, location, callQuery]);

  console.log(loading, data, called);

  return (
    <div>
      <Helmet>
        <title>Search | Nuber Eats</title>
      </Helmet>
      <h1>Search page</h1>
    </div>
  );
};
