import React from "react";
import { Formik, Field, Form } from "formik";
import styles from "./BookingForm.module.css";
import "izitoast/dist/css/iziToast.min.css";
import iziToast from "izitoast";
import DatePickerField from "../DatePickerField/DatePickerField.jsx";

const BookingForm = () => {
  const handleSubmit = (values, action) => {
    try {
      iziToast.success({
        title: "Success",
        message: "We will call you ASAP!",
        position: "topRight",
      });

      action.resetForm();
    } catch (e) {
      iziToast.error(e);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Book your car now</h2>
      <p className={styles.text}>
        Stay connected! We are always ready to help you.
      </p>
      <Formik
        initialValues={{
          name: "",
          email: "",
          bookingDate: null,
          comment: "",
        }}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className={styles.form}>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <Field
              type="text"
              id="name"
              name="name"
              placeholder="Name*"
              className={styles.input}
              required
            />

            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="Email*"
              className={styles.input}
              required
            />

            <label htmlFor="bookingDate" className={styles.label}>
              Booking Date
            </label>
            <DatePickerField name="bookingDate" />

            <label htmlFor="comment" className={styles.label}>
              Comment
            </label>
            <Field
              as="textarea"
              id="comment"
              name="comment"
              placeholder="Comment"
              className={styles.textarea}
            />

            <button type="submit" className={styles.submitButton}>
              Send
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BookingForm;
