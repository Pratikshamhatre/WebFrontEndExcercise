import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import AddCampaignForm from "../AddCampaignForm";
import { createTestStore } from "../../../utils/testStore";
import { mockState } from "./CampaignTable.test";

describe("AddCampaignForm", () => {
  it("shows an error when end date is earlier than start date", () => {
    const store = createTestStore(mockState);

    render(
      <Provider store={store}>
        <AddCampaignForm />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/start date/i), {
      target: { value: "2025-01-10" },
    });

    fireEvent.change(screen.getByLabelText(/end date/i), {
      target: { value: "2025-01-05" },
    });

    fireEvent.click(screen.getByRole("button", { name: /add/i }));

    expect(
      screen.getByText("End date must be after start date")
    ).toBeInTheDocument();
  });
  it("renders all form fields correctly", () => {
  const store = createTestStore(mockState);

  render(
    <Provider store={store}>
      <AddCampaignForm />
    </Provider>
  );

  expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/start date/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/end date/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/budget/i)).toBeInTheDocument();
});
});

