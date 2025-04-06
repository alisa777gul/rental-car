import { useDispatch, useSelector } from "react-redux";
import styles from "./LoadMoreBtn.module.css";
import {
  selectCarList,
  selectCurrentPage,
  selectLoading,
  selectTotalCars,
  selectTotalPages,
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

  if (page >= totalPages || cars.length >= totalCars) {
    if (loading) {
      return <p className={styles.loading}>Loading</p>;
    }
    return null;
  }

  const handleLoadMore = async () => {
    const nextPage = Number(page) + 1;
    const paramsObject = {
      ...Object.fromEntries(searchParams.entries()),
      page: nextPage,
    };

    setSearchParams(buildSearchParams(paramsObject));
    dispatch(setPage(nextPage));
    window.scrollBy({
      top: 416,
      behavior: "smooth",
    });
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
