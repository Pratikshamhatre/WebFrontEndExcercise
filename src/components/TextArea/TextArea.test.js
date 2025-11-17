import { render, screen, fireEvent } from "@testing-library/react";
import TextArea from ".";

describe("TextArea component", () => {
  test("renders with default placeholder", () => {
    render(<TextArea value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText("Enter")).toBeInTheDocument();
  });

  test("renders with custom placeholder", () => {
    render(<TextArea value="" onChange={() => {}} placeholder="Write here" />);
    expect(screen.getByPlaceholderText("Write here")).toBeInTheDocument();
  });

  test("calls onChange", () => {
    const handleChange = jest.fn();
    render(<TextArea value="" onChange={handleChange} />);

    const textarea = screen.getByPlaceholderText("Enter");
    fireEvent.change(textarea, { target: { value: "test" } });

    expect(handleChange).toHaveBeenCalled();
  });


  test("uses provided rows value", () => {
    render(<TextArea value="" onChange={() => {}} rows={10} />);
    const textarea = screen.getByPlaceholderText("Enter");
    expect(textarea).toHaveAttribute("rows", "10");
  });
});
