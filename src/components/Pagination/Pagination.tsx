import { FC } from 'react';

import { IPaginationProps } from 'components/Pagination/interfaces';
import { ONE } from 'constants/index';

export const Pagination: FC<IPaginationProps> = ({
  page,
  onNextPageClick,
  onPrevPageClick,
  totalPages = 1,
}) => {
  return (
    <div className="grid grid-cols-3 text-center max-w-md items-center mx-auto mt-10">
      {page > ONE ? (
        <button
          type="button"
          onClick={onPrevPageClick}
          className="focus:outline-none font-medium text-2xl"
        >
          &larr;
        </button>
      ) : (
        <div />
      )}
      <span>
        Page {page} of {totalPages}
      </span>

      {page !== totalPages ? (
        <button
          type="button"
          onClick={onNextPageClick}
          className="focus:outline-none font-medium text-2xl"
        >
          &rarr;
        </button>
      ) : (
        <div />
      )}
    </div>
  );
};
