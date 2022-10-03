/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CategoryInput } from './globalTypes';

// ====================================================
// GraphQL query operation: CategoryData
// ====================================================

export interface CategoryData_category_restaurants_category {
  __typename: 'Category';
  name: string;
}

export interface CategoryData_category_restaurants {
  __typename: 'Restaurant';
  id: number;
  name: string;
  coverImage: string;
  category: CategoryData_category_restaurants_category | null;
  address: string;
  isPromoted: boolean;
}

export interface CategoryData_category_category {
  __typename: 'Category';
  id: number;
  name: string;
  coverImage: string | null;
  slug: string;
  restaurantCount: number;
}

export interface CategoryData_category {
  __typename: 'CategoryOutput';
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  restaurants: CategoryData_category_restaurants[] | null;
  category: CategoryData_category_category | null;
}

export interface CategoryData {
  category: CategoryData_category;
}

export interface CategoryDataVariables {
  input: CategoryInput;
}
