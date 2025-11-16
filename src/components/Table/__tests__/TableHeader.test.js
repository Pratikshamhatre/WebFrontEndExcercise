import { render, screen } from "@testing-library/react";
import TableHeader from "../TableHeader";

describe("TableHeader", () => {
  it("renders all column headers", () => {
    const columns = [
      { key: "name", label: "Name", align: "left" },
      { key: "age", label: "Age", align: "center" },
      { key: "email", label: "Email", align: "right" }
    ];

    render(
      <table>
        <TableHeader columns={columns} />
      </table>
    );

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
  });
});
