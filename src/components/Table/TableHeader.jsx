export default function TableHeader({ columns }) {
  const alignmentMap = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <thead className="border-b">
      <tr>
        {columns.map((col,i) => (
          <th
            key={`key-${col.key}-${i}`}
            className={`p-2 ${alignmentMap[col.align]} text-sm font-medium sticky top-0 shadow-md z-10 bg-primary text-white`}
          >
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}
