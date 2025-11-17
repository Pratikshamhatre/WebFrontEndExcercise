const Select = ({
  label,
  name,
  value,
  onChange,
  options,
  error,
  labelKey,
  valueKey,
  className,
  id,
  ...props
}) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`text-fluid-sm border h-10 rounded-l-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${className} ${
          error ? "border-danger" : ""
        }`}
        {...props}
      >
        <option value="" disabled>
          Select {label}
        </option>
        {options.map((opt) => (
          <option key={opt[valueKey]} value={opt[valueKey]}>
            {opt[labelKey]}
          </option>
        ))}
      </select>

      {error && <p className="text-danger">{error}</p>}
    </>
  );
};

export default Select;
