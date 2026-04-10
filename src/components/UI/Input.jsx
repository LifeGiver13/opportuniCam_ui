import React from 'react';
import './Input.css';

const Input = ({ label, type = "text", placeholder, value, onChange, ...props }) => {
  return (
    <div className="input-group">
      {label && <label>{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default Input;