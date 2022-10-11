import { FC, useEffect } from 'react';

import { gql, useLazyQuery } from '@apollo/client';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import {
  SearchRestaurant,
  SearchRestaurantVariables,
} from '__generatedTypes__/SearchRestaurant';
import { Pagination } from 'components/Pagination';
import { RestaurantCard } from 'components/RestaurantCard';
import { RESTAURANT_FRAGMENT } from 'fragments';
import { usePagination } from 'hooks';
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
  const [callQuery, { data }] = useLazyQuery<SearchRestaurant, SearchRestaurantVariables>(
    SEARCH_RESTAURANT,
  );

  const { page, onNextPageClick, onPrevPageClick } = usePagination();

  useEffect(() => {
    const [, query] = location.search.split('?term=');

    if (!query) {
      navigate(BASE_URL);
    }
    callQuery({
      variables: {
        input: {
          page,
          query,
        },
      },
    });
  }, [page, navigate, location, callQuery]);

  const restaurantsList = data?.searchRestaurant.restaurants?.map(
    ({ id, coverImage, name, category }) => (
      <RestaurantCard
        key={id}
        id={`${id} `}
        coverImage={coverImage}
        name={name}
        categoryName={category?.name}
      />
    ),
  );

  return (
    <div className="w-full">
      <Helmet>
        <title>Search | Nuber Eats</title>
      </Helmet>

      {data?.searchRestaurant.totalResults ? (
        <>
          <div className="max-w-screen-xl mx-auto grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10 px-4">
            {restaurantsList}
          </div>
          <Pagination
            page={page}
            onNextPageClick={onNextPageClick}
            onPrevPageClick={onPrevPageClick}
            totalPages={data.searchRestaurant.totalPages!}
          />
        </>
      ) : (
        <>
          <h2 className="mx-auto">Nothing was found</h2>
          <Link to="-1"> &larr; Back</Link>
        </>
      )}
    </div>
  );
};
