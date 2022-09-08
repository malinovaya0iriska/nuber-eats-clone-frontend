import { useForm } from 'react-hook-form';

import { ILoginForm } from 'pages/Login/interfaces';
import { ReturnComponentType } from 'types';

export const Login = (): ReturnComponentType => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginForm>();

  const onSubmit = (): void => {};

  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-lg pt-10 pb-7 rounded-lg text-center">
        <h3 className="text-2xl text-gray-800">Log In</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 mt-5 px-5">
          <input
            {...register('email', { required: 'Email is required' })}
            type="email"
            placeholder="Email"
            className="input"
          />

          {errors.email?.message && (
            <span className="font-medium text-red-500">{errors.email?.message}</span>
          )}

          <input
            {...register('password', { required: 'Password is required', minLength: 10 })}
            type="password"
            placeholder="Password"
            className="input"
          />

          {errors.password?.message && (
            <span className="font-medium text-red-500">{errors.password?.message}</span>
          )}
          {errors.password?.type === 'minLength' && (
            <span className="font-medium text-red-500">
              Password must be more than 10 chars.
            </span>
          )}

          <button type="submit" className="mt-3 btn">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};
