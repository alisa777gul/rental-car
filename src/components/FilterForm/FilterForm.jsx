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
import iziToast from "izitoast";
import { MenuItem, Select, FormControl } from "@mui/material";

const FilterForm = () => {
  const [brands, setBrands] = useState([]);
  const prices = Array.from({ length: 17 }, (_, i) => (i + 3) * 10);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchBrands();
        setBrands(data);
      } catch (err) {
        console.error("Error fetching brands: ", err);
      }
    })();
  }, []);

  useEffect(() => {
    if (searchParams) {
      dispatch(setFilter(Object.fromEntries(searchParams.entries())));
    }
  }, [searchParams, dispatch]);

  const handleSubmit = async (values, action) => {
    const { rentalPrice, brand, minMileage, maxMileage } = values;
    const from = Number(minMileage);
    const to = Number(maxMileage);

    if (from && to && from > to) {
      iziToast.error({
        title: "Error",
        message: "Please, provide valid values for mileage.",
        position: "topRight",
      });
      return;
    }

    const params = { ...values, page: 1, limit: 12 };
    const newSearchParams = buildSearchParams(params);

    setSearchParams(newSearchParams);
    dispatch(clearState());
    await dispatch(fetchCars(newSearchParams));
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
              <FormControl fullWidth>
                {" "}
                <label htmlFor="brand">Car brand</label>
                <Select
                  labelId="brand"
                  id="brand"
                  name="brand"
                  value={values.brand}
                  onChange={handleChange}
                  className={styles.brand}
                  displayEmpty
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 272,
                        zIndex: 1300, // убедись, что выше, если скрыто — наоборот уменьши
                      },
                    },
                    disablePortal: true,
                    getContentAnchorEl: null,
                  }}
                >
                  {brands.map((brand) => (
                    <MenuItem key={brand} value={brand}>
                      {brand}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className={styles.priceDiv}>
              <FormControl fullWidth>
                <label htmlFor="rentalPrice">Price / 1 hour</label>

                <Select
                  labelId="rentalPrice"
                  id="rentalPrice"
                  name="rentalPrice"
                  value={values.rentalPrice}
                  onChange={handleChange}
                  className={styles.price}
                  displayEmpty
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 188,
                        zIndex: 1300,
                        maxWidth: 196,
                      },
                    },
                    disablePortal: true,
                    getContentAnchorEl: null,
                  }}
                >
                  {prices.map((price) => (
                    <MenuItem key={price} value={price}>
                      {price}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
