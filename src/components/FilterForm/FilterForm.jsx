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
import icons from "../../assets/sprite.svg";
import ArrowSvg from "../ArrowSvg/ArrowSvg";
import { formatNumberWithCommas } from "../../utils/formatWithCommas";

const FilterForm = () => {
  const [brands, setBrands] = useState([]);
  const prices = Array.from({ length: 17 }, (_, i) => (i + 3) * 10);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  const ArrowIconBrand = React.useMemo(
    () => () => <ArrowSvg isOpen={isBrandOpen} />,
    [isBrandOpen]
  );

  const ArrowIconPrice = React.useMemo(
    () => () => <ArrowSvg isOpen={isPriceOpen} />,
    [isPriceOpen]
  );

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

  const clearForm = (setFieldValue) => {
    setFieldValue("brand", "");
    setFieldValue("rentalPrice", "");
    setFieldValue("minMileage", "");
    setFieldValue("maxMileage", "");
    setSearchParams({});

    dispatch(clearState());
    dispatch(fetchCars({ page: 1, limit: 12 }));
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
        {({
          values,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.brandDiv}>
              <label htmlFor="brand">Car brand</label>
              <Field name="brand">
                {({ field, form }) => (
                  <FormControl fullWidth>
                    <Select
                      labelId="brand"
                      id="brand"
                      name="brand"
                      value={values.brand}
                      onChange={handleChange}
                      className={styles.brand}
                      displayEmpty
                      renderValue={(selected) =>
                        selected === "" ? <p>Choose a brand</p> : selected
                      }
                      MenuProps={{
                        disableScrollLock: true,
                        PaperProps: {
                          style: {
                            maxHeight: 272,
                            zIndex: 1300,
                            overflowY: "auto",
                            maxWidth: 204,
                          },
                        },
                        disablePortal: true,
                      }}
                      onOpen={() => setIsBrandOpen(true)}
                      onClose={() => setIsBrandOpen(false)}
                      IconComponent={ArrowIconBrand}
                    >
                      {brands.map((brand) => (
                        <MenuItem key={brand} value={brand}>
                          {brand}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Field>{" "}
            </div>
            <div className={styles.priceDiv}>
              <label htmlFor="rentalPrice">Price / 1 hour</label>
              <Field name="rentalPrice">
                {({ field, form }) => (
                  <FormControl fullWidth>
                    <Select
                      labelId="rentalPrice"
                      id="rentalPrice"
                      name="rentalPrice"
                      value={field.value}
                      onChange={form.handleChange}
                      className={styles.price}
                      displayEmpty
                      renderValue={(selected) =>
                        selected === "" ? (
                          <p>Choose a price</p>
                        ) : (
                          `To ${selected}$`
                        )
                      }
                      MenuProps={{
                        disableScrollLock: true,
                        PaperProps: {
                          style: {
                            maxHeight: 188,
                            zIndex: 1300,
                            overflowY: "auto",
                            maxWidth: 196,
                          },
                        },
                        disablePortal: true,
                      }}
                      onOpen={() => setIsPriceOpen(true)}
                      onClose={() => setIsPriceOpen(false)}
                      IconComponent={ArrowIconPrice}
                    >
                      {prices.map((price) => (
                        <MenuItem key={price} value={price}>
                          {price}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Field>
            </div>
            <div className={styles.mileageDiv}>
              <label htmlFor="mileage">Car Mileage</label>
              <div className={styles.mileageRange}>
                <div className={styles.ps}>
                  <Field
                    type="text"
                    name="minMileage"
                    id="minMileage"
                    value={formatNumberWithCommas(values.minMileage)}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/,/g, "");
                      handleChange(e);
                      setFieldValue("minMileage", rawValue);
                    }}
                    className={styles.from}
                    placeholder="From"
                  />
                </div>
                <Field
                  type="text"
                  name="maxMileage"
                  id="maxMileage"
                  value={formatNumberWithCommas(values.maxMileage)}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/,/g, "");
                    handleChange(e);
                    setFieldValue("maxMileage", rawValue);
                  }}
                  className={styles.to}
                  placeholder="To"
                />
              </div>
            </div>
            <div className={styles.buttons}>
              {" "}
              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.btn}
              >
                Search
              </button>
              <button
                type="button"
                className={styles.cancel}
                onClick={() => {
                  clearForm(setFieldValue);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default FilterForm;
