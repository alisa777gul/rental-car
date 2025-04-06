import { useState } from "react";
import "./CustomDropdown.module.css";

export default function CustomDropdown({ options, value, onChange, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    onChange(option); // Update Formik value
    setIsOpen(false); // Close dropdown after selecting an option
  };

  return (
    <div className="custom-dropdown">
      <label>{label}</label>
      <div className="dropdown-container" onClick={handleToggleDropdown}>
        <button className="dropdown-button">
          {selectedOption || "Select an option"}
        </button>
        {isOpen && (
          <ul className="dropdown-list">
            {options.map((option) => (
              <li
                key={option}
                onClick={() => handleSelectOption(option)}
                className="dropdown-item"
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
