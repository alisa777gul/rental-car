import { useDispatch, useSelector } from "react-redux";
import styles from "./LoadMoreBtn.module.css";
import {
  selectCurrentPage,
  selectTotalPages,
  selectLoading,
  selectCarList,
  selectTotalCars,
} from "../../redux/cars/selectors";
import { useSearchParams } from "react-router-dom";
import { fetchCars } from "../../redux/cars/operations/fetchCars";
import { buildSearchParams } from "../../utils/buildParams";

export default function LoadMoreBtn() {
  const page = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const [searchParams, setSearchParams] = useSearchParams();
  const cars = useSelector(selectCarList);
  const totalCars = useSelector(selectTotalCars);

  if (page >= totalPages || cars.length >= totalCars) {
    return loading ? <p className={styles.loading}>Loading...</p> : null;
  }

  const handleLoadMore = async () => {
    const params = Object.fromEntries(searchParams.entries());

    setSearchParams(buildSearchParams(params));
    await dispatch(
      fetchCars({ ...params, limit: 12, page: Number(page) + 1 })
    ).unwrap();
  };

  return (
    <button type="button" className={styles.btn} onClick={handleLoadMore}>
      {loading ? "Loading..." : "Load more"}
    </button>
  );
}
