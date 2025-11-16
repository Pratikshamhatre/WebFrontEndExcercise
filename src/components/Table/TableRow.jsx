export default function TableRow({ col, row,index }) {
  return (
    <td
      key={`cell-${row?.id}-${col.key}-${index}`}
      data-testid={col.key === "name" ? "campaign-name" : undefined}
      className={`p-2 border-t text-sm text-${col.align}`}
    >
      {col.render ? col.render(row) : row[col.key]}
    </td>
  );
}
