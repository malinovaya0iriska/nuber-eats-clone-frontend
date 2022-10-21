import { gql } from '@apollo/client';

export const ORDERS_FRAGMENT = gql`
  fragment OrderParts on Order {
    id
    createdAt
    total
  }
`;

export const FULL_ORDER_FRAGMENT = gql`
  fragment FullOrderParts on Order {
    id
    orderStatus
    total
    driver {
      email
    }
    customer {
      email
    }
    restaurant {
      name
    }
  }
`;
