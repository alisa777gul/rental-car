import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearState, setPage } from "../../redux/cars/slice";
import { fetchBrands } from "../../redux/cars/operations/fetchBrands";
import { Formik } from "formik";
import { useSearchParams } from "react-router-dom";
import { setFilter } from "../../redux/filters/slice";

const FilterForm = () => {
  const [brands, setBrands] = useState([]);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const prices = Array.from({ length: 17 }, (_, i) => (i + 3) * 10);
  const buildSearchParams = (paramsObj) => {
    return Object.entries(paramsObj).reduce((result, [key, value]) => {
      if (value) {
        result[key] = value.toString();
      }
      return result;
    }, {});
  };

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

  // useEffect(() => {
  //   const params = Object.fromEntries(searchParams.entries());
  //   dispatch(setFilter(params));
  // }, [dispatch, searchParams]);

  const handleSubmit = (values, action) => {
    const price = values.rentalPrice;
    const brand = values.brand;
    const min = Number(values.minMileage);
    const max = Number(values.maxMileage);

    const newParams = {
      brand,
      rentalPrice: price,
      minMileage: min,
      maxMileage: max,
      page: 1,
      limit: 12,
    };

    const newSearchParams = buildSearchParams(newParams);
    setSearchParams(newSearchParams);
    dispatch(clearState());
    dispatch(setPage(1));

    dispatch(setFilter(newSearchParams));

    action.resetForm();
  };

  return (
    <div>
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
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="brand">Car brand</label>
              <select
                name="brand"
                id="brand"
                value={values.brand}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Choose a brand
                </option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="rentalPrice">Price / 1 hour</label>
              <select
                name="rentalPrice"
                id="rentalPrice"
                value={values.rentalPrice}
                onChange={handleChange}
              >
                <option value="" defaultValue={0}>
                  Choose a price
                </option>
                {prices.map((price) => (
                  <option key={price} value={price}>
                    {price} USD
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="minMileage">Mileage (From)</label>
              <input
                type="number"
                name="minMileage"
                id="minMileage"
                value={values.minMileage}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="maxMileage">Mileage (To)</label>
              <input
                type="number"
                name="maxMileage"
                id="maxMileage"
                value={values.maxMileage}
                onChange={handleChange}
              />
            </div>

            <button type="submit" disabled={isSubmitting}>
              Search
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default FilterForm;
