import { useState } from 'react';

import { gql, useQuery } from '@apollo/client';

import {
  RestaurantsPageQuery,
  RestaurantsPageQueryVariables,
} from '__generatedTypes__/RestaurantsPageQuery';
import { Restaurant } from 'components/Restaurant';
import { ONE } from 'constants/index';
import { ReturnComponentType } from 'types';

const RESTAURANTS_QUERY = gql`
  query RestaurantsPageQuery($input: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        id
        name
        coverImage
        slug
        restaurantCount
      }
    }
    restaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        id
        name
        coverImage
        category {
          name
        }
        address
        isPromoted
      }
    }
  }
`;

export const Restaurants = (): ReturnComponentType => {
  const [page, setPage] = useState<number>(ONE);

  const { data, loading } = useQuery<RestaurantsPageQuery, RestaurantsPageQueryVariables>(
    RESTAURANTS_QUERY,
    {
      variables: {
        input: {
          page,
        },
      },
    },
  );
  const onNextPageClick = (): void => setPage((current: number) => current + ONE);

  const onPrevPageClick = (): void => setPage((current: number) => current - ONE);

  const categoriesList = data?.allCategories.categories?.map(
    ({ id, coverImage, name }) => (
      <div key={id} className="flex flex-col group items-center cursor-pointer">
        <div
          className="w-14 h-14 bg-cover hover:bg-gray-300 rounded-full bg-gray-100"
          style={{ backgroundImage: `url(${coverImage})` }}
        />
        <span className="mt-1 text-sm text-center font-medium">{name}</span>
      </div>
    ),
  );

  const restaurantsList = data?.restaurants.results?.map(
    ({ id, coverImage, name, category }) => (
      <Restaurant
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
      <form className="bg-gray-800 w-full py-40 flex items-center justify-center">
        <input
          type="Search"
          className="input rounded-md border-0 w-3/12"
          placeholder="Search restaurants..."
        />
      </form>
      {!loading && (
        <div className="max-w-screen-2xl pb-20 mx-auto mt-8">
          <div className="flex justify-around max-w-sm mx-auto ">{categoriesList}</div>
          <div className="grid mt-16 grid-cols-3 gap-x-5 gap-y-10">{restaurantsList}</div>
          <div className="grid grid-cols-3 text-center max-w-md items-center mx-auto mt-10">
            {page > 1 ? (
              <button
                type="button"
                onClick={onPrevPageClick}
                className="focus:outline-none font-medium text-2xl"
              >
                &larr;
              </button>
            ) : (
              <div />
            )}
            <span>
              Page {page} of {data?.restaurants.totalPages}
            </span>
            {page !== data?.restaurants.totalPages ? (
              <button
                type="button"
                onClick={onNextPageClick}
                className="focus:outline-none font-medium text-2xl"
              >
                &rarr;
              </button>
            ) : (
              <div />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
