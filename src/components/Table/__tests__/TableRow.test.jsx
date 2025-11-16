import { render, screen } from "@testing-library/react";
import TableRow from "../TableRow";

describe("TableRow", () => {
  it("renders the correct value for column", () => {
    const col = { key: "name", align: "left" };
    const row = { name: "abc", age: 30 };

    render(
      <table>
        <tbody>
          <tr>
            <TableRow col={col} row={row} />
          </tr>
        </tbody>
      </table>
    );

    expect(screen.getByText("abc")).toBeInTheDocument();
  });
});
