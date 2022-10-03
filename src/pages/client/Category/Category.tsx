import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import { CategoryData, CategoryDataVariables } from '__generatedTypes__/CategoryData';
import { RESTAURANT_FRAGMENT, CATEGORY_FRAGMENT } from 'fragments';
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

  const { data, loading } = useQuery<CategoryData, CategoryDataVariables>(
    CATEGORY_QUERY,
    {
      variables: {
        input: {
          page: 1,
          slug: slug || '',
        },
      },
    },
  );

  console.log(data, loading, 'SLUG', slug);

  return <h1>Category</h1>;
};
