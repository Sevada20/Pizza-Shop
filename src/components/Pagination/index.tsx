import { useSelector } from "react-redux";
import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";
import { RootState } from "../../redux/store";

type PaginationProps = {
  onChangePage: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ onChangePage }) => {
  const currentPage = useSelector(
    (state: RootState) => state.filter.currentPage
  );
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
