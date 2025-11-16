import { render, screen, fireEvent } from "@testing-library/react";
import DateRangePicker from ".";

describe("DateRangePicker", () => {
  test("renders start and end date inputs", () => {
    const onChange = jest.fn();
    render(<DateRangePicker startDate="" endDate="" onChange={onChange} />);

    expect(screen.getByLabelText("Start Date")).toBeInTheDocument();
    expect(screen.getByLabelText("End Date")).toBeInTheDocument();
  });

  test("updates start date on input change", () => {
    const onChange = jest.fn();
    render(<DateRangePicker startDate="" endDate="" onChange={onChange} />);

    const startInput = screen.getByLabelText("Start Date");
    fireEvent.change(startInput, { target: { value: "2024-05-01" } });

    expect(onChange).toHaveBeenCalledWith(
      expect.any(Function) 
    );
  });

  test("updates end date on change", () => {
    const onChange = jest.fn();
    render(
      <DateRangePicker startDate="2024-05-01" endDate="" onChange={onChange} />
    );

    const endInput = screen.getByLabelText("End Date");
    fireEvent.change(endInput, { target: { value: "2024-05-10" } });

    expect(onChange).toHaveBeenCalledWith(expect.any(Function));
  });

  test("end date field is disabled when no start date", () => {
    const onChange = jest.fn();
    render(<DateRangePicker startDate="" endDate="" onChange={onChange} />);

    const endInput = screen.getByLabelText("End Date");
    expect(endInput).toBeDisabled();
  });

  test("clear button resets dates", () => {
    const onChange = jest.fn();
    render(
      <DateRangePicker
        startDate="2024-05-01"
        endDate="2024-05-10"
        onChange={onChange}
      />
    );

    const clearBtn = screen.getByRole("button", { name: /clear dates/i });
    fireEvent.click(clearBtn);

    expect(onChange).toHaveBeenCalledWith({
      startDate: "",
      endDate: "",
    });
  });
});
