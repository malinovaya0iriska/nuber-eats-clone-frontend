import { useState } from 'react';

import { ONE } from 'constants/index';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const usePagination = () => {
  const [page, setPage] = useState<number>(ONE);

  const onNextPageClick = (): void => setPage((current: number) => current + ONE);

  const onPrevPageClick = (): void => setPage((current: number) => current - ONE);

  return { page, onNextPageClick, onPrevPageClick };
};
