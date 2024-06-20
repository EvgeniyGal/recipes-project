import cl from './select.module.scss';
import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';

const Select = ({ options = [], value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = option => {
    if (option.name === selectedValue) {
      setSelectedValue(value);
      onChange(option);
    } else {
      setSelectedValue(option.name);
      onChange(option);
    }

    setIsOpen(false);
  };

  const handleClickOutside = event => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`${cl.selectWrapper}  ${isOpen ? cl.active : ''}`}>
      <button
        className={cl.selectButton}
        role="combobox"
        aria-labelledby={cl.selectButton}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={cl.selectDropdown}
        onClick={toggleDropdown}
        ref={buttonRef}
        tabIndex={0}
      >
        <span className={cl.selectValue}>{selectedValue}</span>
        <span>
          <Icon icon="chevron_down"></Icon>
        </span>
      </button>
      {isOpen && (
        <ul
          className={cl.selectDropdown}
          role="listbox"
          id={cl.selectDropdown}
          ref={dropdownRef}
        >
          {options.map(option => (
            <li
              key={option._id}
              role="option"
              onClick={() => handleOptionClick(option)}
            >
              <input
                type="radio"
                id={option.name}
                name={value}
                value={option.name}
                checked={selectedValue === option.name}
                readOnly
              />
              <label htmlFor={option.name}>{option.name}</label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Select;
