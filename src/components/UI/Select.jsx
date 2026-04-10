// src/components/UI/Select.jsx
import React from 'react';
import './Select.css';

const Select = ({ label, name, value, onChange, options }) => {
  return (
    <div className="input-group">
      {label && <label htmlFor={name}>{label}</label>}
      <select 
        id={name}
        name={name}
        value={value} 
        onChange={onChange}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;