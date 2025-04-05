import { useDispatch, useSelector } from "react-redux";
import styles from "./LoadMoreBtn.module.css";
import {
  selectCurrentPage,
  selectLoading,
  selectTotalPages,
} from "../../redux/cars/selectors";
import { setPage } from "../../redux/cars/slice";

export default function LoadMoreBtn() {
  const page = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);

  if (page >= totalPages) {
    if (loading) {
      return <p className={styles.loading}>Loading</p>;
    }
    return null;
  }
  const handleLoadMore = () => {
    if (page < totalPages) dispatch(setPage(page + 1));
  };

  return (
    <>
      {loading ? (
        <p className={styles.loading}>Loading</p>
      ) : (
        <button type="button" className={styles.btn} onClick={handleLoadMore}>
          Load more
        </button>
      )}
    </>
  );
}
