import { gql, useMutation } from '@apollo/client';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';

import {
  CreateRestaurant,
  CreateRestaurantVariables,
} from '__generatedTypes__/CreateRestaurant';
import { Button } from 'components';
import { IFormProps } from 'pages/owner/AddRestaurant/interfaces';
import { ReturnComponentType } from 'types';

const CREATE_RESTAURANT_MUTATION = gql`
  mutation CreateRestaurant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      error
      ok
    }
  }
`;

export const AddRestaurant = (): ReturnComponentType => {
  const [createRestaurantMutation, { loading }] = useMutation<
    CreateRestaurant,
    CreateRestaurantVariables
  >(CREATE_RESTAURANT_MUTATION);

  const { register, getValues, formState, handleSubmit } = useForm<IFormProps>({
    mode: 'onChange',
  });

  const onSubmit = (): void => {
    console.log(getValues());
  };

  console.log(createRestaurantMutation);

  return (
    <div className="container">
      <Helmet>
        <title>Add Restaurant | Nuber Eats</title>
      </Helmet>

      <h1>Add Restaurant</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <Button
          isLoading={loading}
          isDisabled={!formState.isValid}
          actionText="Create Restaurant"
        />
      </form>
    </div>
  );
};
