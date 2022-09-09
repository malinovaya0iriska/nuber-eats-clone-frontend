import { FC } from 'react';

import { IFormErrorProps } from 'components/FormError/interfaces';

export const FormError: FC<IFormErrorProps> = ({ errorMessage }) => {
  return <span className="font-medium text-red-500">{errorMessage}</span>;
};
