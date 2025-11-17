import { render, screen, fireEvent } from "@testing-library/react";
import Select from ".";

describe("Select Component", () => {
  const mockOptions = [
    { id: 1, name: "Option A" },
    { id: 2, name: "Option B" },
  ];

  const defaultProps = {
    label: "Category",
    name: "category",
    value: "",
    onChange: jest.fn(),
    options: mockOptions,
    labelKey: "name",
    valueKey: "id",
    id: "category-select",
  };

  test("renders label text", () => {
    render(<Select {...defaultProps} />);
    expect(screen.getByText("Category")).toBeInTheDocument();
  });

  test("renders default placeholder option", () => {
    render(<Select {...defaultProps} />);
    expect(screen.getByText("Select Category")).toBeInTheDocument();
  });

  test("renders all options", () => {
    render(<Select {...defaultProps} />);
    expect(screen.getByText("Option A")).toBeInTheDocument();
    expect(screen.getByText("Option B")).toBeInTheDocument();
  });

  test("calls onChange when value changes", () => {
    render(<Select {...defaultProps} />);

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "2" },
    });

    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  test("shows error message when error prop is provided", () => {
    render(<Select {...defaultProps} error="Required field" />);

    expect(screen.getByText("Required field")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveClass("border-danger");
  });

  test("applies custom className", () => {
    render(<Select {...defaultProps} className="custom-select" />);

    expect(screen.getByRole("combobox")).toHaveClass("custom-select");
  });

  test("passes extra props to select", () => {
    render(<Select {...defaultProps} data-testid="dropdown" />);

    expect(screen.getByTestId("dropdown")).toBeInTheDocument();
  });
});
