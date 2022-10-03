export interface IPaginationProps {
  page: number;
  totalPages: number;
  onNextPageClick: () => void;
  onPrevPageClick: () => void;
}
