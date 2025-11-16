import { render, screen } from "@testing-library/react";
import Table from "../Table";

jest.mock("../../Loader", () => () => <div>Loading...</div>);
jest.mock("../TableRow", () => ({ col, row }) => (
  <td data-testid="table-row">{row[col.accessor]}</td>
));

describe("Table component", () => {
  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Age", accessor: "age" },
  ];

  test("renders loader when loading", () => {
    render(<Table loading={true} columns={columns} data={[]} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders error message", () => {
    render(<Table error="Something went wrong" columns={columns} data={[]} />);

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  test("shows No Data Found", () => {
    render(<Table columns={columns} data={[]} />);

    expect(screen.getByText("No Data Found")).toBeInTheDocument();
  });

  test("renders data rows when data exists", () => {
    const data = [
      { id: 1, name: "abc", age: 28 },
      { id: 2, name: "xyz", age: 22 },
    ];

    render(<Table columns={columns} data={data} />);

    const rows = screen.getAllByTestId("table-row");
    expect(rows.length).toBe(4); // 2 rows × 2 columns
  });

  test("renders correct cell values", () => {
    const data = [{ id: 1, name: "abc", age: 30 }];

    render(<Table columns={columns} data={data} />);

    expect(screen.getByText("abc")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
  });
});
