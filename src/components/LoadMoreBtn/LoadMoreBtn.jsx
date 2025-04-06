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
import { setPage } from "../../redux/cars/slice";

export default function LoadMoreBtn() {
  const page = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const [searchParams, setSearchParams] = useSearchParams();
  const cars = useSelector(selectCarList);
  const totalCars = useSelector(selectTotalCars);

  const buildSearchParams = (paramsObj) => {
    return Object.entries(paramsObj).reduce((result, [key, value]) => {
      if (value) {
        result[key] = value.toString();
      }
      return result;
    }, {});
  };

  // Hide button when there are no more pages
  if (page >= totalPages || cars.length >= totalCars) {
    return loading ? <p className={styles.loading}>Loading...</p> : null;
  }

  const handleLoadMore = () => {
    const nextPage = Number(page) + 1;
    const paramsObject = {
      ...Object.fromEntries(searchParams.entries()),
      page: nextPage, // Устанавливаем следующую страницу
    };

    setSearchParams(buildSearchParams(paramsObject)); // Обновляем параметры в URL
    dispatch(setPage(nextPage)); // Обновляем текущую страницу в Redux
  };

  return (
    <button type="button" className={styles.btn} onClick={handleLoadMore}>
      {loading ? "Loading..." : "Load more"}
    </button>
  );
}
