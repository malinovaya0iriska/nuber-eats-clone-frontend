/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RestaurantInput } from './globalTypes';

// ====================================================
// GraphQL query operation: RestaurantData
// ====================================================

export interface RestaurantData_restaurant_restaurant_category {
  __typename: 'Category';
  name: string;
}

export interface RestaurantData_restaurant_restaurant {
  __typename: 'Restaurant';
  id: number;
  name: string;
  coverImage: string;
  category: RestaurantData_restaurant_restaurant_category | null;
  address: string;
  isPromoted: boolean;
}

export interface RestaurantData_restaurant {
  __typename: 'RestaurantOutput';
  ok: boolean;
  error: string | null;
  restaurant: RestaurantData_restaurant_restaurant | null;
}

export interface RestaurantData {
  restaurant: RestaurantData_restaurant;
}

export interface RestaurantDataVariables {
  input: RestaurantInput;
}
