import React from "react";

const Input = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
  disabled = false,
  error,
  id,
  label = "",
  ...props
}) => {
  return (
    <>
      {label && (
        <label className="font-medium text-gray-600" htmlFor={id}>
          {label}
        </label>
      )}

      <input
        type={type}
        className={`text-fluid-sm border h-10 rounded-l-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${className} ${
          error ? "border-danger" : ""
        }`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        id={id}
        {...props}
      />
      {error && <p className="text-danger">{error}</p>}
    </>
  );
};

export default Input;
