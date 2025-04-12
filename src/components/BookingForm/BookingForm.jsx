import React from "react";
import { Formik, Field, Form } from "formik";
import styles from "./BookingForm.module.css";
import "izitoast/dist/css/iziToast.min.css";
import iziToast from "izitoast";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers";
import { enGB } from "date-fns/locale";
import { format } from "date-fns";

const BookingForm = () => {
  const customLocale = {
    ...enGB,
    localize: {
      ...enGB.localize,
      day: (n) => {
        const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
        return days[n];
      },
    },
  };

  const handleSubmit = (values, action) => {
    iziToast.success({
      title: "Success",
      message: "We will call you ASAP!",
      position: "topRight",
    });

    action.resetForm();
  };

  // Функция для форматирования дня недели
  const formatWeekDay = (date) => {
    const dayOfWeek = format(date, "EEE", { locale: customLocale });
    return dayOfWeek;
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
        {({ values, setFieldValue }) => (
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
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              locale={customLocale}
            >
              <DatePicker
                value={values.bookingDate}
                format="dd.MM.yyyy"
                onChange={(newValue) => setFieldValue("bookingDate", newValue)} // Обновление значения через Formik
                minDate={new Date()}
                className={styles.input}
                formatWeekDay={formatWeekDay}
                slotProps={{
                  calendarHeader: {
                    sx: {
                      position: "relative",
                      "& .MuiPickersArrowSwitcher-root": {
                        width: 0,
                      },
                      "& .MuiPickersCalendarHeader-labelContainer": {
                        margin: "auto",
                      },
                      "& .MuiIconButton-edgeEnd": {
                        position: "absolute",
                        left: 0,
                        top: 0,
                        bottom: 0,
                      },
                      "& .MuiIconButton-edgeStart": {
                        position: "absolute",
                        right: 0,
                        top: 0,
                        bottom: 0,
                      },
                    },
                  },

                  leftArrowIcon: {
                    sx: { color: "var(--color-blue-button)", fontSize: "24px" },
                  },
                  rightArrowIcon: {
                    sx: { color: "var(--color-blue-button)", fontSize: "24px" },
                  },
                }}
              />
            </LocalizationProvider>

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
