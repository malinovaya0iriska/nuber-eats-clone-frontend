import { useState } from 'react';

import { gql, useMutation, useQuery } from '@apollo/client';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';

import { createOrder, createOrderVariables } from '__generatedTypes__/createOrder';
import { DishParts } from '__generatedTypes__/DishParts';
import { OrderItemOptionInputType } from '__generatedTypes__/globalTypes';
import {
  RestaurantData,
  RestaurantDataVariables,
} from '__generatedTypes__/RestaurantData';
import { Dish, DishOption } from 'components';
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from 'fragments';
import { CreateOrderItemInput } from 'graphql/generated/schema';
import { IRestaurantParams } from 'pages/client/Restaurant/interfaces';
import { Paths } from 'routes/constants';
import { ReturnComponentType } from 'types';

const RESTAURANT_QUERY = gql`
  query RestaurantData($input: RestaurantInput!) {
    restaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
        menu {
          ...DishParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
`;

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      ok
      error
      orderId
    }
  }
`;

export const Restaurant = (): ReturnComponentType => {
  const params = useParams<IRestaurantParams>();
  const navigate = useNavigate();

  const { data } = useQuery<RestaurantData, RestaurantDataVariables>(RESTAURANT_QUERY, {
    variables: {
      input: {
        id: +params.id!,
      },
    },
  });

  const [orderStarted, setOrderStarted] = useState(false);
  const [orderItems, setOrderItems] = useState<CreateOrderItemInput[]>([]);

  const triggerStartOrder = (): void => {
    setOrderStarted(true);
  };

  const getItem = (dishId: number): CreateOrderItemInput | undefined => {
    return orderItems.find(order => order.dishId === dishId);
  };

  const isSelected = (dishId: number): boolean => {
    return Boolean(orderItems.find(order => order.dishId === dishId));
  };

  const addItemToOrder = (dishId: number): void => {
    if (isSelected(dishId)) {
      return;
    }
    setOrderItems(current => [{ dishId, options: [] }, ...current]);
  };

  const removeFromOrder = (dishId: number): void => {
    setOrderItems(current => current.filter(dish => dish.dishId !== dishId));
  };

  const addOptionToItem = (dishId: number, optionName: string): void => {
    if (!isSelected(dishId)) {
      return;
    }
    const oldItem = getItem(dishId);

    if (oldItem) {
      const hasOption = Boolean(
        oldItem.options?.find(aOption => aOption.name === optionName),
      );

      if (!hasOption) {
        removeFromOrder(dishId);
        setOrderItems(current => [
          { dishId, options: [{ name: optionName }, ...oldItem.options!] },
          ...current,
        ]);
      }
    }
  };

  const removeOptionFromItem = (dishId: number, optionName: string): void => {
    if (!isSelected(dishId)) {
      return;
    }
    const oldItem = getItem(dishId);

    if (oldItem) {
      removeFromOrder(dishId);
      setOrderItems(current => [
        {
          dishId,
          options: oldItem.options?.filter(option => option.name !== optionName),
        },
        ...current,
      ]);
    }
  };

  const getOptionFromItem = (
    item: CreateOrderItemInput,
    optionName: string,
  ): OrderItemOptionInputType | undefined => {
    return item.options?.find(option => option.name === optionName);
  };

  const isOptionSelected = (dishId: number, optionName: string): boolean => {
    const item = getItem(dishId);

    if (item) {
      return Boolean(getOptionFromItem(item, optionName));
    }

    return false;
  };

  const triggerCancelOrder = (): void => {
    setOrderStarted(false);
    setOrderItems([]);
  };

  const onCompleted = (data: createOrder): void => {
    const { createOrder } = data;

    if (data.createOrder.ok) {
      navigate(`${Paths.Order}/${createOrder.orderId}`);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [createOrderMutation, { loading: placingOrder }] = useMutation<
    createOrder,
    createOrderVariables
  >(CREATE_ORDER_MUTATION, {
    onCompleted,
  });

  const triggerConfirmOrder = (): void => {
    if (placingOrder) {
      return;
    }

    if (orderItems.length === 0) {
      alert("Can't place empty order");

      return;
    }
    const ok = window.confirm('You are about to place an order');

    if (ok) {
      createOrderMutation({
        variables: {
          input: {
            restaurantId: +params.id!,
            items: orderItems,
          },
        },
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>{data?.restaurant.restaurant?.name || ''} | Nuber Eats</title>
      </Helmet>
      <div
        className="w-full bg-gray-800 bg-center bg-cover py-48"
        style={{
          backgroundImage: `url(${data?.restaurant.restaurant?.coverImage})`,
        }}
      >
        <div className="bg-white w-4/12 py-8 pl-48">
          <h4 className="text-4xl mb-3">{data?.restaurant.restaurant?.name}</h4>
          <h5 className="text-sm font-light mb-2">
            {data?.restaurant.restaurant?.category?.name}
          </h5>
          <h6 className="text-sm font-light">{data?.restaurant.restaurant?.address}</h6>
        </div>
      </div>
      <div className="container pb-32 flex flex-col items-end mt-20">
        {!orderStarted && (
          <button
            type="button"
            onClick={triggerStartOrder}
            className="btn btn-lime px-10"
          >
            Start Order
          </button>
        )}
        {orderStarted && (
          <div className="flex items-center">
            <button
              type="button"
              onClick={triggerConfirmOrder}
              className="btn btn-lime px-10 mr-3"
            >
              Confirm Order
            </button>
            <button
              type="button"
              onClick={triggerCancelOrder}
              className="px-10 btn btn-black"
            >
              Cancel Order
            </button>
          </div>
        )}

        <div className="w-full grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
          {data?.restaurant.restaurant?.menu.map((dish: DishParts & { id: number }) => (
            <Dish
              id={dish.id}
              orderStarted={orderStarted}
              key={dish.id}
              name={dish.name}
              description={dish.description}
              price={dish.price}
              isCustomer
              options={dish.options}
              addItemToOrder={addItemToOrder}
              isSelected={isSelected(dish.id)}
              removeFromOrder={removeFromOrder}
            >
              {dish.options?.map(option => (
                <DishOption
                  key={dish.id + option.name}
                  dishId={dish.id}
                  isSelected={isOptionSelected(dish.id, option.name)}
                  name={option.name}
                  extra={option.extra}
                  addOptionToItem={addOptionToItem}
                  removeOptionFromItem={removeOptionFromItem}
                />
              ))}
            </Dish>
          ))}
        </div>
      </div>
    </>
  );
};
