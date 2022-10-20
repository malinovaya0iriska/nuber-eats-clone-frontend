import { FC } from 'react';

import { IButtonProps } from 'components/Button/interfaces';

export const Button: FC<IButtonProps> = ({
  isLoading,
  isDisabled,
  actionText,
  onClick,
}) => {
  return (
    <button
      type="submit"
      className={`py-3 px-5 text-white text-lg rounded-lg focus:outline-none ${
        isDisabled
          ? 'bg-light-gray pointer-events-none'
          : 'bg-black  hover:bg-gray-850 active:bg-light-grey'
      }`}
      onClick={onClick || (() => null)}
    >
      {isLoading ? 'Loading...' : actionText}
    </button>
  );
};
