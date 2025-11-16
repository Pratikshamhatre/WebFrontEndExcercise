
const TextArea = ({
  value,
  onChange,
  rows = 6 ,
  placeholder =  "Enter",
  className = "",
  ...props
}) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      rows={rows}
      className={`w-full border p-2 rounded outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default TextArea;
