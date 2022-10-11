/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateRestaurantInput } from './globalTypes';

// ====================================================
// GraphQL mutation operation: CreateRestaurant
// ====================================================

export interface CreateRestaurant_createRestaurant {
  __typename: 'CreateRestaurantOutput';
  error: string | null;
  ok: boolean;
  restaurantId: number;
}

export interface CreateRestaurant {
  createRestaurant: CreateRestaurant_createRestaurant;
}

export interface CreateRestaurantVariables {
  createRestaurantInput: CreateRestaurantInput;
}
