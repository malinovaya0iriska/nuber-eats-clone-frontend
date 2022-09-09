import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type AllCategoriesOutput = {
  __typename?: 'AllCategoriesOutput';
  categories?: Maybe<Array<Category>>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type Category = {
  __typename?: 'Category';
  coverImage?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  name: Scalars['String'];
  restaurantCount: Scalars['Int'];
  restaurants: Array<Restaurant>;
  slug: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type CategoryInput = {
  page?: InputMaybe<Scalars['Float']>;
  slug: Scalars['String'];
};

export type CategoryOutput = {
  __typename?: 'CategoryOutput';
  category?: Maybe<Category>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  totalPages?: Maybe<Scalars['Float']>;
  totalResults?: Maybe<Scalars['Float']>;
};

export type CreateAccountInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  role: UserRole;
};

export type CreateAccountOutput = {
  __typename?: 'CreateAccountOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateDishInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  options?: InputMaybe<Array<DishOptionInputType>>;
  price: Scalars['Int'];
  restaurantId: Scalars['Int'];
};

export type CreateDishOutput = {
  __typename?: 'CreateDishOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateOrderInput = {
  items: Array<CreateOrderItemInput>;
  restaurantId: Scalars['Int'];
};

export type CreateOrderItemInput = {
  dishId: Scalars['Int'];
  options?: InputMaybe<Array<OrderItemOptionInputType>>;
};

export type CreateOrderOutput = {
  __typename?: 'CreateOrderOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  orderId?: Maybe<Scalars['Int']>;
};

export type CreatePaymentInput = {
  restaurantID: Scalars['Int'];
  transactionID: Scalars['Int'];
};

export type CreatePaymentOutput = {
  __typename?: 'CreatePaymentOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateRestaurantInput = {
  address?: InputMaybe<Scalars['String']>;
  categoryName: Scalars['String'];
  coverImage: Scalars['String'];
  name: Scalars['String'];
};

export type CreateRestaurantOutput = {
  __typename?: 'CreateRestaurantOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type DeleteDishInput = {
  dishId: Scalars['Int'];
};

export type DeleteRestaurantInput = {
  restaurantId: Scalars['Float'];
};

export type Dish = {
  __typename?: 'Dish';
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  name: Scalars['String'];
  options?: Maybe<Array<DishOption>>;
  photo?: Maybe<Scalars['String']>;
  price: Scalars['Int'];
  restaurant?: Maybe<Restaurant>;
  updatedAt: Scalars['DateTime'];
};

export type DishChoice = {
  __typename?: 'DishChoice';
  extra?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
};

export type DishChoiceInputType = {
  extra?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
};

export type DishOption = {
  __typename?: 'DishOption';
  choices?: Maybe<Array<DishChoice>>;
  extra?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
};

export type DishOptionInputType = {
  choices?: InputMaybe<Array<DishChoiceInputType>>;
  extra?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
};

export type EditDishInput = {
  description?: InputMaybe<Scalars['String']>;
  dishId: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  options?: InputMaybe<Array<DishOptionInputType>>;
  price?: InputMaybe<Scalars['Int']>;
};

export type EditDishOutput = {
  __typename?: 'EditDishOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditOrderInput = {
  id: Scalars['Float'];
  orderStatus: OrderStatus;
};

export type EditOrderOutput = {
  __typename?: 'EditOrderOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditProfileInput = {
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type EditProfileOutput = {
  __typename?: 'EditProfileOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditRestaurantInput = {
  address?: InputMaybe<Scalars['String']>;
  categoryName?: InputMaybe<Scalars['String']>;
  coverImage?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  restaurantId: Scalars['Float'];
};

export type EditRestaurantOutput = {
  __typename?: 'EditRestaurantOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type GetOrderInput = {
  id: Scalars['Float'];
};

export type GetOrderOutput = {
  __typename?: 'GetOrderOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  order?: Maybe<Order>;
};

export type GetOrdersInput = {
  status?: InputMaybe<OrderStatus>;
};

export type GetOrdersOutput = {
  __typename?: 'GetOrdersOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  orders?: Maybe<Array<Order>>;
};

export type GetPaymentOutput = {
  __typename?: 'GetPaymentOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  payments?: Maybe<Array<Payment>>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  token?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount: CreateAccountOutput;
  createDish: CreateDishOutput;
  createOrder: CreateOrderOutput;
  createPayment: CreatePaymentOutput;
  createRestaurant: CreateRestaurantOutput;
  deleteDish: EditDishOutput;
  deleteRestaurant: EditRestaurantOutput;
  editOrder: EditOrderOutput;
  editProfile: EditProfileOutput;
  editRestaurant: EditRestaurantOutput;
  editeDish: EditDishOutput;
  login: LoginOutput;
  takeOrder: TakeOrderOutput;
  verifyEmail: VerifyEmailOutput;
};

export type MutationCreateAccountArgs = {
  input: CreateAccountInput;
};

export type MutationCreateDishArgs = {
  input: CreateDishInput;
};

export type MutationCreateOrderArgs = {
  input: CreateOrderInput;
};

export type MutationCreatePaymentArgs = {
  input: CreatePaymentInput;
};

export type MutationCreateRestaurantArgs = {
  input: CreateRestaurantInput;
};

export type MutationDeleteDishArgs = {
  input: DeleteDishInput;
};

export type MutationDeleteRestaurantArgs = {
  input: DeleteRestaurantInput;
};

export type MutationEditOrderArgs = {
  input: EditOrderInput;
};

export type MutationEditProfileArgs = {
  input: EditProfileInput;
};

export type MutationEditRestaurantArgs = {
  input: EditRestaurantInput;
};

export type MutationEditeDishArgs = {
  input: EditDishInput;
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationTakeOrderArgs = {
  input: TakeOrderInput;
};

export type MutationVerifyEmailArgs = {
  input: VerifyEmailInput;
};

export type Order = {
  __typename?: 'Order';
  createdAt: Scalars['DateTime'];
  customer?: Maybe<User>;
  driver?: Maybe<User>;
  id: Scalars['Float'];
  items: Array<OrderItem>;
  orderStatus: OrderStatus;
  restaurant: Restaurant;
  total?: Maybe<Scalars['Float']>;
  updatedAt: Scalars['DateTime'];
};

export type OrderItem = {
  __typename?: 'OrderItem';
  createdAt: Scalars['DateTime'];
  dish: Dish;
  id: Scalars['Float'];
  options?: Maybe<Array<OrderItemOption>>;
  updatedAt: Scalars['DateTime'];
};

export type OrderItemOption = {
  __typename?: 'OrderItemOption';
  choice?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type OrderItemOptionInputType = {
  choice?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export enum OrderStatus {
  Cooked = 'Cooked',
  Cooking = 'Cooking',
  Delivered = 'Delivered',
  Pending = 'Pending',
  PickedUp = 'PickedUp',
}

export type OrderUpdatesInput = {
  id: Scalars['Float'];
};

export type Payment = {
  __typename?: 'Payment';
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  restaurant: Restaurant;
  restaurantID: Scalars['Int'];
  transactionID: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userID: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  category: CategoryOutput;
  getAllCategories: AllCategoriesOutput;
  getOrder: GetOrderOutput;
  getOrders: GetOrdersOutput;
  getPayments: GetPaymentOutput;
  getUserProfile: UserProfileOutput;
  me: User;
  restaurant: RestaurantOutput;
  restaurants: RestaurantsOutput;
  searchRestaurant: SearchRestaurantOutput;
};

export type QueryCategoryArgs = {
  input: CategoryInput;
};

export type QueryGetOrderArgs = {
  input: GetOrderInput;
};

export type QueryGetOrdersArgs = {
  input: GetOrdersInput;
};

export type QueryGetUserProfileArgs = {
  userId: Scalars['Float'];
};

export type QueryRestaurantArgs = {
  input: RestaurantInput;
};

export type QueryRestaurantsArgs = {
  input: RestaurantsInput;
};

export type QuerySearchRestaurantArgs = {
  input: SearchRestaurantInput;
};

export type Restaurant = {
  __typename?: 'Restaurant';
  address: Scalars['String'];
  category?: Maybe<Category>;
  coverImage: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  isPromoted: Scalars['Boolean'];
  menu: Array<Dish>;
  name: Scalars['String'];
  orders: Array<Order>;
  owner?: Maybe<User>;
  promotedUntil?: Maybe<Scalars['DateTime']>;
  updatedAt: Scalars['DateTime'];
};

export type RestaurantInput = {
  page?: InputMaybe<Scalars['Float']>;
  restarauntId: Scalars['Float'];
};

export type RestaurantOutput = {
  __typename?: 'RestaurantOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  restaurant?: Maybe<Restaurant>;
  totalPages?: Maybe<Scalars['Float']>;
  totalResults?: Maybe<Scalars['Float']>;
};

export type RestaurantsInput = {
  page?: InputMaybe<Scalars['Float']>;
};

export type RestaurantsOutput = {
  __typename?: 'RestaurantsOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  results?: Maybe<Array<Restaurant>>;
  totalPages?: Maybe<Scalars['Float']>;
  totalResults?: Maybe<Scalars['Float']>;
};

export type SearchRestaurantInput = {
  page?: InputMaybe<Scalars['Float']>;
  query: Scalars['String'];
};

export type SearchRestaurantOutput = {
  __typename?: 'SearchRestaurantOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  restaurants?: Maybe<Array<Restaurant>>;
  totalPages?: Maybe<Scalars['Float']>;
  totalResults?: Maybe<Scalars['Float']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  cookedOrders: Order;
  orderUpdates: Order;
  pendingOrders: Order;
};

export type SubscriptionOrderUpdatesArgs = {
  input: OrderUpdatesInput;
};

export type TakeOrderInput = {
  id: Scalars['Float'];
};

export type TakeOrderOutput = {
  __typename?: 'TakeOrderOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['Float'];
  orders: Array<Order>;
  password: Scalars['String'];
  payments: Array<Payment>;
  restaurants: Array<Restaurant>;
  rides: Array<Order>;
  role: UserRole;
  updatedAt: Scalars['DateTime'];
  verified: Scalars['Boolean'];
};

export type UserProfileOutput = {
  __typename?: 'UserProfileOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  user?: Maybe<User>;
};

export enum UserRole {
  Client = 'Client',
  Delivery = 'Delivery',
  Owner = 'Owner',
}

export type VerifyEmailInput = {
  code: Scalars['String'];
};

export type VerifyEmailOutput = {
  __typename?: 'VerifyEmailOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type LogInMutationVariables = Exact<{
  loginInput: LoginInput;
}>;

export type LogInMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'LoginOutput';
    ok: boolean;
    token?: string | null;
    error?: string | null;
  };
};

export const LogInDocument = gql`
  mutation LogIn($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;
export type LogInMutationFn = Apollo.MutationFunction<
  LogInMutation,
  LogInMutationVariables
>;

/**
 * __useLogInMutation__
 *
 * To run a mutation, you first call `useLogInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logInMutation, { data, loading, error }] = useLogInMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLogInMutation(
  baseOptions?: Apollo.MutationHookOptions<LogInMutation, LogInMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogInMutation, LogInMutationVariables>(
    LogInDocument,
    options,
  );
}
export type LogInMutationHookResult = ReturnType<typeof useLogInMutation>;
export type LogInMutationResult = Apollo.MutationResult<LogInMutation>;
export type LogInMutationOptions = Apollo.BaseMutationOptions<
  LogInMutation,
  LogInMutationVariables
>;
