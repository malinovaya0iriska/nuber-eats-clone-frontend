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

export interface RestaurantData_restaurant_restaurant_menu_options_choices {
  __typename: 'DishChoice';
  name: string;
  extra: number | null;
}

export interface RestaurantData_restaurant_restaurant_menu_options {
  __typename: 'DishOption';
  name: string;
  extra: number | null;
  choices: RestaurantData_restaurant_restaurant_menu_options_choices[] | null;
}

export interface RestaurantData_restaurant_restaurant_menu {
  __typename: 'Dish';
  id: number;
  name: string;
  price: number;
  photo: string | null;
  description: string | null;
  options: RestaurantData_restaurant_restaurant_menu_options[] | null;
}

export interface RestaurantData_restaurant_restaurant {
  __typename: 'Restaurant';
  id: number;
  name: string;
  coverImage: string;
  category: RestaurantData_restaurant_restaurant_category | null;
  address: string;
  isPromoted: boolean;
  menu: RestaurantData_restaurant_restaurant_menu[];
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
