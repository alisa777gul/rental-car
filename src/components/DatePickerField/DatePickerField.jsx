import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import styles from "./DatePickerField.module.css";
import icons from "../../assets/sprite.svg";

const DatePickerField = ({ name }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  return (
    <DatePicker
      selected={field.value}
      onChange={(val) => setFieldValue(name, val)}
      className={styles.input}
      minDate={new Date()}
      calendarClassName={styles.datePickerCalendar}
      dayClassName={() => styles.datePickerDay}
      formatWeekDay={(day) => day.toUpperCase().slice(0, 3)}
      popperClassName={styles.datePickerPopper}
      placeholderText="Booking date"
      renderCustomHeader={({ monthDate, decreaseMonth, increaseMonth }) => (
        <div className="react-custom">
          <div className="react-datepicker__head">
            <button
              type="button"
              className="react-datepicker__navigation react-datepicker__navigation--previous"
              onClick={decreaseMonth}
              aria-label="Previous Month"
            >
              <span className="react-datepicker__navigation-icon--previous">
                <svg width={24} height={24}>
                  <use href={icons + "#icon-arrow"} />
                </svg>
              </span>
            </button>
            <span className="react-datepicker__current-month">
              {monthDate.toLocaleString("en-US", { month: "long" })}{" "}
              {monthDate.getFullYear()}
            </span>
            <button
              type="button"
              className="react-datepicker__navigation react-datepicker__navigation--next"
              onClick={increaseMonth}
              aria-label="Next Month"
            >
              <span className="react-datepicker__navigation-icon--next">
                <svg width={24} height={24}>
                  <use href={icons + "#icon-arrow"} />
                </svg>
              </span>
            </button>
          </div>
        </div>
      )}
      calendarStartDay={1}
    />
  );
};

export default DatePickerField;
