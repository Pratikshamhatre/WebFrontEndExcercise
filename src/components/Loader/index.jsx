import { LOADER_SIZES } from "../../utils/constants";

export default function Loader({
  size = "md",
  variant = "primary",
  thickness = 4,
  label = "",
  className = "",
}) {
  const pixelSize = LOADER_SIZES[size] || size;
  const borderColor = `border-${variant}`;

  return (
    <div
      className={`flex flex-col justify-center items-center gap-2 ${className}`}
    >
      <div
        className={`
          animate-spin rounded-full border-t-transparent 
          ${borderColor}
        `}
        style={{
          width: pixelSize,
          height: pixelSize,
          borderWidth: thickness,
        }}
      />
      {label && <p className="text-sm text-gray-600">{label}</p>}
    </div>
  );
}
