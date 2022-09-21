/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RestaurantsInput } from './globalTypes';

// ====================================================
// GraphQL query operation: RestaurantsPageQuery
// ====================================================

export interface RestaurantsPageQuery_allCategories_categories {
  __typename: 'Category';
  id: number;
  name: string;
  coverImage: string | null;
  slug: string;
  restaurantCount: number;
}

export interface RestaurantsPageQuery_allCategories {
  __typename: 'AllCategoriesOutput';
  ok: boolean;
  error: string | null;
  categories: RestaurantsPageQuery_allCategories_categories[] | null;
}

export interface RestaurantsPageQuery_restaurants_results_category {
  __typename: 'Category';
  name: string;
}

export interface RestaurantsPageQuery_restaurants_results {
  __typename: 'Restaurant';
  id: number;
  name: string;
  coverImage: string;
  category: RestaurantsPageQuery_restaurants_results_category | null;
  address: string;
  isPromoted: boolean;
}

export interface RestaurantsPageQuery_restaurants {
  __typename: 'RestaurantsOutput';
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  results: RestaurantsPageQuery_restaurants_results[] | null;
}

export interface RestaurantsPageQuery {
  allCategories: RestaurantsPageQuery_allCategories;
  restaurants: RestaurantsPageQuery_restaurants;
}

export interface RestaurantsPageQueryVariables {
  input: RestaurantsInput;
}
