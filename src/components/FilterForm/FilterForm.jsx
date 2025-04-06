/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearState } from "../../redux/cars/slice";
import { fetchBrands } from "../../redux/cars/operations/fetchBrands";
import { Field, Formik } from "formik";
import { useSearchParams } from "react-router-dom";
import { setFilter } from "../../redux/filters/slice";
import styles from "./FilterForm.module.css";
import { fetchCars } from "../../redux/cars/operations/fetchCars";
import { buildSearchParams } from "../../utils/buildParams";

const FilterForm = () => {
  const [brands, setBrands] = useState([]);
  const prices = Array.from({ length: 17 }, (_, i) => (i + 3) * 10);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchBrandData = async () => {
      try {
        const data = await fetchBrands();
        setBrands(data);
      } catch (err) {
        console.error("Error fetching brands: ", err);
      }
    };

    fetchBrandData();
  }, [dispatch, searchParams]);

  useEffect(() => {
    if (searchParams) {
      dispatch(setFilter(Object.fromEntries(searchParams.entries())));
    }
  }, [searchParams, dispatch]);

  const handleSubmit = (values, action) => {
    const rentalPrice = values.rentalPrice;
    const brand = values.brand;
    const from = Number(values.minMileage);
    const to = Number(values.maxMileage);

    const newParams = {
      ...values,
      page: 1,
      limit: 12,
    };

    const newSearchParams = buildSearchParams(newParams);

    setSearchParams(buildSearchParams(values));
    dispatch(clearState());
    dispatch(fetchCars(newSearchParams));
    dispatch(setFilter(newSearchParams));

    action.resetForm();
  };

  return (
    <div className={styles.cont}>
      <Formik
        initialValues={{
          brand: "",
          rentalPrice: "",
          minMileage: "",
          maxMileage: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.brandDiv}>
              <label htmlFor="brand">Car brand</label>
              <select
                name="brand"
                id="brand"
                value={values.brand}
                onChange={handleChange}
                className={styles.brand}
              >
                <option value="">Choose a brand</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.priceDiv}>
              <label htmlFor="rentalPrice">Price / 1 hour</label>
              <select
                name="rentalPrice"
                id="rentalPrice"
                value={values.rentalPrice}
                onChange={handleChange}
                className={styles.price}
              >
                <option value="" defaultValue={0}>
                  Choose a price
                </option>
                {prices.map((price) => (
                  <option key={price} value={price}>
                    {price}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.mileageDiv}>
              <label htmlFor="mileage">Car Mileage</label>
              <div className={styles.mileageRange}>
                <div>
                  <Field
                    type="number"
                    name="minMileage"
                    id="minMileage"
                    value={values.minMileage}
                    onChange={handleChange}
                    className={styles.from}
                    placeholder="From"
                  />
                </div>

                <div>
                  <Field
                    type="number"
                    name="maxMileage"
                    id="maxMileage"
                    value={values.maxMileage}
                    onChange={handleChange}
                    className={styles.to}
                    placeholder="To"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.btn}
            >
              Search
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default FilterForm;
