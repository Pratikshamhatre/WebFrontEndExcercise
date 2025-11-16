export default function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
  fullWidth = false,
  type = "button",
  rounded=0,
  ...props
}) {
  const baseStyles =
    `md:text-fluid-sm text-fluid-xs px-3 py-2 rounded-${rounded} transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`;

  const variants = {
    primary: "bg-primary text-white hover:bg-primary-hover",
    secondary: "bg-secondary text-gray-800 hover:bg-gray-300",
    danger: "bg-danger text-white hover:bg-red-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
