import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setFilters } from "../../redux/cars/slice"; // Assuming setFilters action updates filters in Redux
import { fetchBrands } from "../../redux/cars/operations/fetchBrands";
import { Formik } from "formik";

const FilterForm = () => {
  const [brands, setBrands] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBrandData = async () => {
      try {
        const data = await fetchBrands();
        setBrands(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBrandData();
  }, []);

  const prices = [];

  for (let i = 30; i < 200; i += 10) {
    prices.push(i);
  }

  const handleSubmit = (values) => {
    dispatch(setFilters(values));
  };

  return (
    <div>
      <Formik
        initialValues={{
          brand: "",
          price: "",
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
                <option value="">Choose a brand</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="price">Price / 1 hour</label>
              <select
                name="price"
                id="price"
                value={values.price}
                onChange={handleChange}
              >
                <option value="">Choose a price</option>
                {prices.map((price) => (
                  <option key={price} value={price}>
                    {price}
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
