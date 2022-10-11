import { useState } from 'react';

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

  const { register, handleSubmit, formState, getValues, setValue } = useForm<IForm>({
    mode: 'onChange',
  });

  const onSubmit = (): void => {
    const { name, price, description, ...rest } = getValues();

    const optionObjects = optionsNumber.map(theId => ({
      name: rest[`${theId}-optionName`],
      extra: +rest[`${theId}-optionExtra`],
    }));

    createDishMutation({
      variables: {
        input: {
          name,
          price: +price,
          description,
          restaurantId: +restaurantId!,
          options: optionObjects,
        },
      },
    });
    navigate(-1);
  };

  const [optionsNumber, setOptionsNumber] = useState<number[]>([]);

  const onAddOptionClick = (): void => {
    setOptionsNumber(current => [Date.now(), ...current]);
  };
  const onDeleteClick = (idToDelete: number): void => {
    setOptionsNumber(current => current.filter(id => id !== idToDelete));

    setValue(`${idToDelete}-optionName`, '');

    setValue(`${idToDelete}-optionExtra`, '');
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
        <div className="my-10">
          <h4 className="font-medium  mb-3 text-lg">Dish Options</h4>
          <button
            type="button"
            onClick={onAddOptionClick}
            className=" cursor-pointer text-white bg-gray-900 py-1 px-2 mt-5"
          >
            Add Dish Option
          </button>
          {optionsNumber.length !== 0 &&
            optionsNumber.map(id => (
              <div key={id} className="mt-5">
                <input
                  {...register(`${id}-optionName`)}
                  className="py-2 px-4 focus:outline-none mr-3 focus:border-gray-600 border-2"
                  type="text"
                  placeholder="Option Name"
                />
                <input
                  {...register(`${id}-optionExtra`)}
                  className="py-2 px-4 focus:outline-none focus:border-gray-600 border-2"
                  type="number"
                  min={0}
                  placeholder="Option Extra"
                />
                <button
                  type="button"
                  onClick={() => onDeleteClick(id)}
                  className=" cursor-pointer text-white bg-red-500 py-1 px-2 mt-5 ml-1"
                >
                  Delete Option
                </button>
              </div>
            ))}
        </div>

        <Button
          isLoading={loading}
          isDisabled={!formState.isValid}
          actionText="Create Dish"
        />
      </form>
    </div>
  );
};
