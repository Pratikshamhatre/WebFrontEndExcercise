import { render, screen, fireEvent } from "@testing-library/react";
import Button from ".";

describe("Button component", () => {
  test("renders children correctly", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  test("calls onClick when button is clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Save</Button>);

    fireEvent.click(screen.getByText("Save"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("does not call onClick when disabled", () => {
    const handleClick = jest.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>
    );

    fireEvent.click(screen.getByText("Disabled"));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
