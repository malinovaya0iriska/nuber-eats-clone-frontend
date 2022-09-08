import { useForm } from 'react-hook-form';

import { IForm } from 'routes/types';
import { ReturnComponentType } from 'types';

export const LoggedOutRouter = (): ReturnComponentType => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const onSubmit = (): void => {
    console.log(watch());
  };
  const onInvalid = (): void => {
    console.log("can't create account");
  };

  console.log(errors);

  return (
    <div>
      <h1>Logged Out</h1>

      <div>
        <h1>Logged Out</h1>
        <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
          <div>
            <input
              {...register('email', {
                required: 'This is required',
                pattern: /^[A-Za-z0-9._%+-]+@gmail.com$/,
              })}
              type="email"
              placeholder="email"
            />
            {errors.email?.message && (
              <span className="font-bold text-red-600">{errors.email?.message}</span>
            )}
            {errors.email?.type === 'pattern' && (
              <span className="font-bold text-red-600">Only gmail allowed</span>
            )}
          </div>
          <div>
            <input
              {...register('password', { required: 'This is required' })}
              type="password"
              placeholder="password"
            />
            {errors.password?.message && (
              <span className="font-bold text-red-600">{errors.password?.message}</span>
            )}
          </div>
          <button type="submit" className="bg-yellow-300 text-white">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
