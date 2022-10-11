import { gql, useQuery } from '@apollo/client';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';

import { CategoryData, CategoryDataVariables } from '__generatedTypes__/CategoryData';
import { Pagination } from 'components/Pagination';
import { RestaurantCard } from 'components/RestaurantCard';
import { RESTAURANT_FRAGMENT, CATEGORY_FRAGMENT } from 'fragments';
import { usePagination } from 'hooks';
import { ICategoryParams } from 'pages/client/Category/interfaces';
import { ReturnComponentType } from 'types';

const CATEGORY_QUERY = gql`
  query CategoryData($input: CategoryInput!) {
    category(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
      category {
        ...CategoryParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

export const Category = (): ReturnComponentType => {
  const { slug } = useParams<ICategoryParams>();

  const { page, onNextPageClick, onPrevPageClick } = usePagination();

  const { data } = useQuery<CategoryData, CategoryDataVariables>(CATEGORY_QUERY, {
    variables: {
      input: {
        page,
        slug: slug || '',
      },
    },
  });

  const restaurantsList = data?.category.restaurants?.map(
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
      <h1 className="text-center text-xl">Results for {slug}</h1>
      {data?.category.totalPages ? (
        <>
          <div className="max-w-screen-xl mx-auto grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10 px-4">
            {restaurantsList}
          </div>
          <Pagination
            page={page}
            onNextPageClick={onNextPageClick}
            onPrevPageClick={onPrevPageClick}
            totalPages={data.category.totalPages!}
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
