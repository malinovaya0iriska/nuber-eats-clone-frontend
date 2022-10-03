import { gql, useQuery } from '@apollo/client';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';

import {
  RestaurantsPageQuery,
  RestaurantsPageQueryVariables,
} from '__generatedTypes__/RestaurantsPageQuery';
import { Pagination } from 'components/Pagination';
import { RestaurantCard } from 'components/RestaurantCard';
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from 'fragments';
import { usePagination } from 'hooks';
import { IFormProps } from 'pages/client/Restaurants/interfaces';
import { CATEGORY, SEARCH_ITEM } from 'routes/constants';
import { ReturnComponentType } from 'types';

const RESTAURANTS_QUERY = gql`
  query RestaurantsPageQuery($input: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        ...CategoryParts
      }
    }
    restaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

export const Restaurants = (): ReturnComponentType => {
  const { page, onNextPageClick, onPrevPageClick } = usePagination();

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

  const { register, handleSubmit, getValues } = useForm<IFormProps>();

  const navigate = useNavigate();

  const onSearchSubmit = (): void => {
    const { searchTerm } = getValues();

    navigate({
      pathname: SEARCH_ITEM,
      search: `?${createSearchParams({ term: searchTerm })}`,
    });
  };

  const categoriesList = data?.allCategories.categories?.map(
    ({ id, coverImage, name, slug }) => (
      <Link key={id} to={`${CATEGORY}/${slug}`}>
        <div className="flex flex-col group items-center cursor-pointer">
          <div
            className="w-14 h-14 bg-cover hover:bg-gray-300 rounded-full bg-gray-100"
            style={{ backgroundImage: `url(${coverImage})` }}
          />
          <span className="mt-1 text-sm text-center font-medium">{name}</span>
        </div>
      </Link>
    ),
  );

  const restaurantsList = data?.restaurants.results?.map(
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
        <title>Home | Nuber Eats</title>
      </Helmet>
      <form
        onSubmit={handleSubmit(onSearchSubmit)}
        className="bg-gray-800 w-full py-40 flex items-center justify-center"
      >
        <input
          {...register('searchTerm', { required: true, min: 3 })}
          type="Search"
          className="input rounded-md border-0 w-3/4 md:w-3/12"
          placeholder="Search restaurants..."
        />
      </form>
      {!loading && (
        <div className="max-w-screen-2xl pb-20 mx-auto mt-8">
          <div className="flex justify-around max-w-sm mx-auto ">{categoriesList}</div>
          <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10 px-4">
            {restaurantsList}
          </div>
          {data?.restaurants.totalPages && (
            <Pagination
              page={page}
              totalPages={data.restaurants.totalPages}
              onNextPageClick={onNextPageClick}
              onPrevPageClick={onPrevPageClick}
            />
          )}
        </div>
      )}
    </div>
  );
};
