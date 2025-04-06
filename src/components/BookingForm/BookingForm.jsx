import React from "react";
import { Formik, Field, Form } from "formik";
import styles from "./BookingForm.module.css";

const BookingForm = () => {
  const handleSubmit = (values) => {
    console.log("Form values:", values);
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
          bookingDate: "",
          comment: "",
        }}
        onSubmit={handleSubmit}
      >
        <Form className={styles.form}>
          <div className={styles.field}>
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
          </div>

          <div className={styles.field}>
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
          </div>

          <div className={styles.field}>
            <label htmlFor="bookingDate" className={styles.label}>
              Booking Date
            </label>
            <Field
              type="date"
              id="bookingDate"
              name="bookingDate"
              placeholder="Booking date"
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
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
          </div>

          <button type="submit" className={styles.submitButton}>
            Send
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default BookingForm;
