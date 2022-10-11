/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchRestaurantInput } from './globalTypes';

// ====================================================
// GraphQL query operation: SearchRestaurant
// ====================================================

export interface SearchRestaurant_searchRestaurant_restaurants_category {
  __typename: 'Category';
  name: string;
}

export interface SearchRestaurant_searchRestaurant_restaurants {
  __typename: 'Restaurant';
  id: number;
  name: string;
  coverImage: string;
  category: SearchRestaurant_searchRestaurant_restaurants_category | null;
  address: string;
  isPromoted: boolean;
}

export interface SearchRestaurant_searchRestaurant {
  __typename: 'SearchRestaurantOutput';
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  restaurants: SearchRestaurant_searchRestaurant_restaurants[] | null;
}

export interface SearchRestaurant {
  searchRestaurant: SearchRestaurant_searchRestaurant;
}

export interface SearchRestaurantVariables {
  input: SearchRestaurantInput;
}
