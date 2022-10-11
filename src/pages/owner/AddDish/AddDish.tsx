import { gql, useMutation } from '@apollo/client';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { createDish, createDishVariables } from '__generatedTypes__/createDish';
import { Button } from 'components';
import { IForm, IParams } from 'pages/owner/AddDish/interfaces';
import { MY_RESTAURANT_QUERY } from 'pages/owner/MyRestaurant/MyRestaurant';
import { ReturnComponentType } from 'types';

const CREATE_DISH_MUTATION = gql`
  mutation createDish($input: CreateDishInput!) {
    createDish(input: $input) {
      ok
      error
    }
  }
`;

export const AddDish = (): ReturnComponentType => {
  const { id: restaurantId } = useParams<IParams>();
  const navigate = useNavigate();
  const [createDishMutation, { loading }] = useMutation<createDish, createDishVariables>(
    CREATE_DISH_MUTATION,
    {
      refetchQueries: [
        {
          query: MY_RESTAURANT_QUERY,
          variables: {
            input: {
              id: +restaurantId!,
            },
          },
        },
      ],
    },
  );

  const { register, handleSubmit, formState, getValues } = useForm<IForm>({
    mode: 'onChange',
  });

  const onSubmit = (): void => {
    const { name, price, description } = getValues();

    createDishMutation({
      variables: {
        input: {
          name,
          price: +price,
          description,
          restaurantId: +restaurantId!,
        },
      },
    });
    navigate(-1);
  };

  return (
    <div className="container flex flex-col items-center mt-52">
      <Helmet>
        <title>Add Dish | Nuber Eats</title>
      </Helmet>

      <h4 className="font-semibold text-2xl mb-3">Add Dish</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
      >
        <input
          className="input"
          type="text"
          placeholder="Name"
          {...register('name', { required: 'Name is required.' })}
        />
        <input
          className="input"
          type="number"
          min={0}
          placeholder="Price"
          {...register('price', { required: 'Price is required.' })}
        />
        <input
          className="input"
          type="text"
          placeholder="Description"
          {...register('description', { required: 'Description is required.' })}
        />
        <Button
          isLoading={loading}
          isDisabled={!formState.isValid}
          actionText="Create Dish"
        />
      </form>
    </div>
  );
};
