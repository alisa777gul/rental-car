import React from "react";
import { Formik, Field, Form } from "formik";
import styles from "./BookingForm.module.css";

const BookingForm = () => {
  const handleSubmit = (values) => {
    console.log("Form values:", values);
  };

  return (
    <div className={styles.formContainer}>
      <h2>Book your car now</h2>
      <p>Stay connected! We are always ready to help you.</p>

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
            <label htmlFor="name">Name</label>
            <Field
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="Your email"
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="bookingDate">Booking Date</label>
            <Field
              type="date"
              id="bookingDate"
              name="bookingDate"
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="comment">Comment</label>
            <Field
              as="textarea"
              id="comment"
              name="comment"
              placeholder="Your comment"
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
