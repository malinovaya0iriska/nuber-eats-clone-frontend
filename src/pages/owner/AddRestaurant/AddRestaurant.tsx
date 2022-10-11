import { useState } from 'react';

import { gql, useApolloClient, useMutation } from '@apollo/client';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateRestaurant,
  CreateRestaurantVariables,
} from '__generatedTypes__/CreateRestaurant';
import { Button, FormError } from 'components';
import { IFormProps } from 'pages/owner/AddRestaurant/interfaces';
import { MY_RESTAURANTS_QUERY } from 'pages/owner/MyRestaurants/MyRestaurants';
import { Paths } from 'routes/constants';
import { ReturnComponentType } from 'types';

const CREATE_RESTAURANT_MUTATION = gql`
  mutation CreateRestaurant($createRestaurantInput: CreateRestaurantInput!) {
    createRestaurant(input: $createRestaurantInput) {
      error
      ok
      restaurantId
    }
  }
`;

export const AddRestaurant = (): ReturnComponentType => {
  const client = useApolloClient();
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState('');

  const onCompleted = (data: CreateRestaurant): void => {
    const {
      createRestaurant: { ok, error, restaurantId },
    } = data;

    if (ok) {
      const { name, categoryName, address } = getValues();

      setUploading(false);
      const queryResult = client.readQuery({
        query: MY_RESTAURANTS_QUERY,
        variables: { input: { page: 1 } },
      });

      client.writeQuery({
        query: MY_RESTAURANTS_QUERY,
        variables: { input: { page: 1 } },
        data: {
          myRestaurants: {
            ...queryResult.myRestaurants,
            restaurants: [
              {
                address,
                category: {
                  name: categoryName,
                  __typename: 'Category',
                },
                coverImg: imageUrl,
                id: restaurantId,
                isPromoted: false,
                name,
                __typename: 'Restaurant',
              },
              ...queryResult.myRestaurants.restaurants,
            ],
          },
        },
      });

      navigate(Paths.BaseUrl);
    } else {
      console.log(error);
      navigate(Paths.NonMatchUrl);
    }
  };

  const [createRestaurantMutation, { data }] = useMutation<
    CreateRestaurant,
    CreateRestaurantVariables
  >(CREATE_RESTAURANT_MUTATION, {
    onCompleted,
    refetchQueries: [{ query: MY_RESTAURANTS_QUERY, variables: { input: { page: 1 } } }],
  });

  const { register, getValues, formState, handleSubmit } = useForm<IFormProps>({
    mode: 'onChange',
  });

  const [uploading, setUploading] = useState(false);

  const onSubmit = async (): Promise<void> => {
    try {
      setUploading(true);
      const { file, name, categoryName, address } = getValues();
      const actualFile = file[0];
      const formBody = new FormData();

      formBody.append('file', actualFile);
      const { url: coverImage } =
        (await (
          await fetch('http://localhost:4000/uploads/', {
            method: 'POST',
            body: formBody,
          })
        ).json()) || '';

      setImageUrl(coverImage);

      createRestaurantMutation({
        variables: {
          createRestaurantInput: {
            name,
            categoryName,
            address,
            coverImage,
          },
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col items-center mt-52">
      <Helmet>
        <title>Add Restaurant | Nuber Eats</title>
      </Helmet>

      <h4 className="font-semibold text-2xl mb-3">Add Restaurant</h4>
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
          type="text"
          placeholder="Address"
          {...register('address', { required: 'Address is required.' })}
        />
        <input
          className="input"
          type="text"
          placeholder="Category Name"
          {...register('categoryName', { required: 'Category Name is required.' })}
        />
        <div>
          <input type="file" accept="image/*" {...register('file', { required: true })} />
        </div>
        <Button
          isLoading={uploading}
          isDisabled={!formState.isValid}
          actionText="Create Restaurant"
        />
        {data?.createRestaurant?.error && (
          <FormError errorMessage={data.createRestaurant.error} />
        )}
      </form>
    </div>
  );
};
