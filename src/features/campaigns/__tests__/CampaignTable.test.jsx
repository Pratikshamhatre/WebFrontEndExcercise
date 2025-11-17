import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CampaignTable from "../CampaignTable";
import { Provider } from "react-redux";
import { createTestStore } from "../../../utils/testStore";

export const mockState = {
  campaigns: {
    campaignsList: [
      {
        id: 1,
        name: "Layo",
        startDate: "2024-01-01",
        endDate: "2024-01-10",
        Budget: 1000,
        userName: "Layo",
        active: false,
      },
      {
        id: 2,
        name: "Miboo",
        startDate: "2024-02-01",
        endDate: "2024-01-01",
        Budget: 2000,
        userName: "User2",
        active: true,
      },
    ],
    usersList: [],
  },
};

const setup = () => {
  const store = createTestStore(mockState);
  return render(
    <Provider store={store}>
      <CampaignTable />
    </Provider>
  );
};

describe("CampaignTable", () => {
  test("filters campaigns by search", async () => {
    setup();

    const searchInput = screen.getByPlaceholderText(/search by name/i);
    fireEvent.change(searchInput, { target: { value: "layo" } });

    const rows = await screen.findAllByTestId("campaign-name");
    expect(rows).toHaveLength(1);
    expect(rows[0]).toHaveTextContent("Layo");
  });
});
