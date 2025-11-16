import { render, screen, fireEvent } from "@testing-library/react";
import { useDispatch } from "react-redux";
import AddCampaignForm from "../AddCampaignForm";
import { addCampaigns } from "../../../store/campaignsSlice";
import { showSuccessToast } from "../../../components/Toast";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

jest.mock("../../../components/Toast", () => ({
  showSuccessToast: jest.fn(),
}));

describe("AddCampaignForm", () => {
  let mockDispatch;

  beforeEach(() => {
    mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    jest.clearAllMocks();
  });

  test("renders textarea and buttons", () => {
    render(<AddCampaignForm />);

    expect(screen.getByLabelText(/Add Campaigns/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/please paste json array/i)).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
    expect(screen.getByText("Clear")).toBeInTheDocument();
  });

  test("display error on invalid JSON", () => {
    render(<AddCampaignForm />);

    fireEvent.change(screen.getByPlaceholderText(/json array/i), {
      target: { value: "invalid-json" },
    });

    fireEvent.click(screen.getByText("Add"));

    expect(screen.getByText("Invalid JSON")).toBeInTheDocument();
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  test("shows error when JSON is not an array", () => {
    render(<AddCampaignForm />);

    fireEvent.change(screen.getByPlaceholderText(/json array/i), {
      target: { value: JSON.stringify({ name: "test" }) },
    });

    fireEvent.click(screen.getByText("Add"));

    expect(
      screen.getByText("Please provide an array of campaigns")
    ).toBeInTheDocument();
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  test("dispatches addCampaigns, clears input and shows toast on valid JSON", () => {
    render(<AddCampaignForm />);

    const textarea = screen.getByPlaceholderText(/json array/i);

    const validArray = JSON.stringify([{ id: 1, name: "Campaign" }]);

    fireEvent.change(textarea, { target: { value: validArray } });
    fireEvent.click(screen.getByText("Add"));

    expect(mockDispatch).toHaveBeenCalledWith(addCampaigns(JSON.parse(validArray)));
    expect(showSuccessToast).toHaveBeenCalledWith("Campaigns saved successfully!");
    expect(textarea.value).toBe("");
  });

  test("clear button resets textarea and error", () => {
    render(<AddCampaignForm />);

    const textarea = screen.getByPlaceholderText(/json array/i);

    fireEvent.change(textarea, { target: { value: "test" } });
    fireEvent.click(screen.getByText("Add")); 

    expect(screen.getByText("Invalid JSON")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Clear"));

    expect(textarea.value).toBe("");
    expect(screen.queryByText("Invalid JSON")).not.toBeInTheDocument();
  });
});
