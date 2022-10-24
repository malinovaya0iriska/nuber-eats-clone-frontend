import { useEffect } from 'react';

import { gql, useMutation, useQuery, useSubscription } from '@apollo/client';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryTheme,
  VictoryTooltip,
  VictoryZoomContainer,
} from 'victory';

import { createPayment, createPaymentVariables } from '__generatedTypes__/createPayment';
import { DishParts } from '__generatedTypes__/DishParts';
import { myRestaurant, myRestaurantVariables } from '__generatedTypes__/myRestaurant';
import { pendingOrders } from '__generatedTypes__/pendingOrders';
import { Dish } from 'components';
import {
  DISH_FRAGMENT,
  FULL_ORDER_FRAGMENT,
  ORDERS_FRAGMENT,
  RESTAURANT_FRAGMENT,
} from 'fragments';
import { useMe } from 'hooks';
import { IParams } from 'pages/owner/MyRestaurant/interfaces';
import { Paths } from 'routes/constants';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const MY_RESTAURANT_QUERY = gql`
  query myRestaurant($input: MyRestaurantInput!) {
    myRestaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
        menu {
          ...DishParts
        }
        orders {
          ...OrderParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
  ${ORDERS_FRAGMENT}
`;

const PENDING_ORDERS_SUBSCRIPTION = gql`
  subscription pendingOrders {
    pendingOrders {
      ...FullOrderParts
    }
  }
  ${FULL_ORDER_FRAGMENT}
`;

const CREATE_PAYMENT_MUTATION = gql`
  mutation createPayment($input: CreatePaymentInput!) {
    createPayment(input: $input) {
      ok
      error
    }
  }
`;

export const MyRestaurant = (): ReturnComponentType => {
  const { id } = useParams<IParams>();
  const navigate = useNavigate();
  const { data } = useQuery<myRestaurant, myRestaurantVariables>(MY_RESTAURANT_QUERY, {
    variables: {
      input: {
        id: +id!,
      },
    },
  });

  const { data: userData } = useMe();
  const triggerPaddle = (): void => {
    if (userData?.me.email) {
      // @ts-ignore
      window.Paddle.Setup({ vendor: 158258 });
      // @ts-ignore
      window.Paddle.Checkout.open({
        product: 794257,
        email: userData.me.email,
        successCallback: (data: any) => {
          createPaymentMutation({
            variables: {
              input: {
                transactionID: data.checkout.id,
                restaurantID: +id!,
              },
            },
          });
        },
      });
    }
  };
  const onCompleted = (data: createPayment): void => {
    if (data.createPayment.ok) {
      alert('Your restaurant is being promoted!');
    }
  };

  const [createPaymentMutation] = useMutation<createPayment, createPaymentVariables>(
    CREATE_PAYMENT_MUTATION,
    {
      onCompleted,
    },
  );

  const { data: subscriptionData } = useSubscription<pendingOrders>(
    PENDING_ORDERS_SUBSCRIPTION,
  );

  useEffect(() => {
    if (subscriptionData?.pendingOrders.id) {
      navigate(`${Paths.Order}/${subscriptionData.pendingOrders.id}`);
    }
  }, [subscriptionData, navigate]);

  return (
    <div className="w-full">
      <Helmet>
        <title> Restaurant | Nuber Eats</title>
        <script src="https://cdn.paddle.com/paddle/paddle.js" />
      </Helmet>
      <div
        className="bg-gray-700  py-28 bg-center bg-cover"
        style={{
          backgroundImage: `url(${data?.myRestaurant.restaurant?.coverImage})`,
        }}
      />
      <div className="checkout-container" />
      <div className="container mt-10 pl-6">
        <h2 className="text-4xl font-medium mb-10">
          {data?.myRestaurant.restaurant?.name || 'Loading...'}
        </h2>
        <Link
          to={`${Paths.Restaurants}/${id}${Paths.AddDish}`}
          className="mr-8 text-white bg-gray-800 py-3 px-10"
        >
          Add Dish &rarr;
        </Link>
        <button
          type="button"
          onClick={triggerPaddle}
          className="text-white bg-lime-700 py-3 px-10"
        >
          Buy Promotion &rarr;
        </button>
        <div className="mt-10">
          {data?.myRestaurant.restaurant?.menu.length === 0 ? (
            <h4 className="text-xl mb-5">Please upload a dish!</h4>
          ) : (
            <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
              {data?.myRestaurant.restaurant?.menu.map(
                (dish: DishParts & { id: number }) => (
                  <Dish
                    key={dish.id}
                    name={dish.name}
                    description={dish.description}
                    price={dish.price}
                  />
                ),
              )}
            </div>
          )}
        </div>
        <div className="  mt-10">
          <VictoryChart
            height={500}
            theme={VictoryTheme.material}
            width={window.innerWidth}
            domainPadding={50}
            containerComponent={<VictoryZoomContainer />}
          >
            <VictoryLine
              labels={({ datum }) => `$${datum.y}`}
              labelComponent={
                <VictoryTooltip style={{ fontSize: 18 } as any} renderInPortal dy={-20} />
              }
              data={data?.myRestaurant.restaurant?.orders.map(order => ({
                x: order.createdAt,
                y: order.total,
              }))}
              interpolation="natural"
              style={{
                data: {
                  strokeWidth: 5,
                },
              }}
            />
            <VictoryAxis
              tickLabelComponent={<VictoryLabel renderInPortal />}
              style={{
                tickLabels: {
                  fontSize: 20,
                } as any,
              }}
              tickFormat={tick => new Date(tick).toLocaleDateString('ko')}
            />
          </VictoryChart>
        </div>
      </div>
    </div>
  );
};
