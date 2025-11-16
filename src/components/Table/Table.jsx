import Loader from "../Loader";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

const Table = ({ columns = [], data = [], loading = false, error = null, tableWrapperClassnames }) => {
  const showNoData = !loading && !error && data?.length === 0;
  const showData = !loading && !error && data?.length > 0;

  return (
    <div className={`overflow-auto border rounded-md shadow-sm ${tableWrapperClassnames}`}>
      <table className="min-w-full min-h-100">
        <TableHeader columns={columns} />

        <tbody>
          {loading && (
            <tr>
              <td colSpan={columns.length} className="py-6 text-center">
                <Loader size="lg" label="Loading..." />
              </td>
            </tr>
          )}

          {!loading && error && (
            <tr>
              <td colSpan={columns.length} className="py-4 text-center text-red-500 font-medium">
                {error}
              </td>
            </tr>
          )}

          {showNoData && (
            <tr className={tableWrapperClassnames}>
              <td colSpan={columns.length} className="text-center py-4 text-gray-500 italic">
                No Data Found
              </td>
            </tr>
          )}

          {showData &&
            data.map((row, rowIndex) => (
              <tr key={`row-${row?.id}-${rowIndex}`} className="hover:bg-gray-50 transition">
                {columns.map((col, colIndex) => (
                  <TableRow
                    key={`cell-${row?.id}-${col.key}-${colIndex}`} 
                    col={col}
                    row={row}
                  />
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
