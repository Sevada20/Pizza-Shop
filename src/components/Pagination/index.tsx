import { useSelector } from "react-redux";
import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";

type PaginationProps = {
  onChangePage: any;
};

const Pagination: React.FC<PaginationProps> = ({ onChangePage }) => {
  const currentPage = useSelector((state) => state.filter.currentPage);
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      forcePage={currentPage - 1}
      nextLabel=">"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};
export default Pagination;
