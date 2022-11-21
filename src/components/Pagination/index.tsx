import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

type PaginationProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, onPageChange }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      previousLabel="<"
      nextLabel=">"
      onPageChange={(event) => onPageChange(event.selected + 1)}
      forcePage={currentPage - 1}
      pageRangeDisplayed={4}
      pageCount={3}
      // renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
