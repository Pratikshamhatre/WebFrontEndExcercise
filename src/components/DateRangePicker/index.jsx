import { useEffect } from "react";
import Button from "../Button";

export default function DateRangePicker({
  startDate,
  endDate,
  onChange,
  className = "",
  min,
  max,
  disabled,
}) {
  useEffect(() => {
    onChange({ startDate, endDate });
  }, [startDate, endDate]);

  const handleChange = (key, value) => {
    onChange((prev) => ({ ...prev, [key]: value }));
  };

  const handleClear = () => {
    onChange({ startDate: "", endDate: "" });
  };

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div className="flex gap-4 items-end">
        <div className="flex flex-col w-max">
          <label className="text-fluid-sm font-medium text-gray-600" htmlFor="startDate">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            min={min}
            max={max}
            onChange={(e) => handleChange("startDate", e.target.value)}
            className="border h-10 px-3 py-2 rounded focus:ring-2 focus:ring-blue-400"
            placeholder="Start Date"
            disabled={disabled}
            id="startDate"
          />
        </div>

        <div className="flex flex-col w-max">
          <label className="text-fluid-sm font-medium text-gray-600" htmlFor="endDate">End Date</label>
          <input
            type="date"
            value={endDate}
            min={startDate || min}
            max={max}
            onChange={(e) => handleChange("endDate", e.target.value)}
            className="border h-10 px-3 py-2 rounded focus:ring-2 focus:ring-blue-400"
            placeholder="End Date"
            disabled={!startDate || disabled}
            id="endDate"
          />
        </div>
          <Button type="button" variant="primary" onClick={handleClear} rounded="lg" disabled={!startDate || !endDate}>
            Clear Dates
          </Button>
        
      </div>
    </div>
  );
}
