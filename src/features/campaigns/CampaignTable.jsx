import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../hooks/useFetch";
import { fetchUsersThunk } from "../../services/usersService";
import { isTodayInRange } from "../../utils/dateUtils";
import { addCampaigns } from "../../store/campaignsSlice";
import Table from "../../components/Table/Table";
import SearchInput from "../../components/SearchInput";
import DateRangePicker from "../../components/DateRangePicker";
import { getUserName } from "../../utils/usersUtils";

export default function CampaignTable() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [submit, setSubmit] = useState(false);

  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });
  const { campaignsList, usersList } = useSelector((state) => state.campaigns);

  const shouldFetch = campaignsList?.length > 0;
  const { loading, error } = useFetch(fetchUsersThunk, [], true, shouldFetch);
  useEffect(() => {
    window.AddCampaigns = function (campaignArray) {
      dispatch(addCampaigns(campaignArray));
    };
  }, [dispatch]);

  const columns = [
    { key: "name", label: "Campaign Name", align: "left" },
    {
      key: "startDate",
      label: "Start Date",
      align: "left",
    },
    {
      key: "endDate",
      label: "End Date",
      align: "left",
    },

    {
      key: "active",
      label: "Active",
      render: (row) => {
        const isActive = isTodayInRange(row.startDate, row.endDate);

        return (
          <div className="inline-flex items-center">
            <span
              className={`h-3 w-3 border rounded-full ${
                isActive ? "bg-success" : "bg-danger"
              }`}
            ></span>

            <span className={`px-3 py-1 rounded-full text-primary text-sm `}>
              {isActive ? "Active" : "Inactive"}
            </span>
          </div>
        );
      },
      align: "left",
    },

    {
      key: "budget",
      label: "Budget",
      render: (row) => `$${row.Budget}`,
      align: "center",
    },

    {
      key: "userName",
      label: "User",
      render: (row) => getUserName(usersList, row.userId),
      align: "left",
    },
  ];

 const filtered = useMemo(() => {
  const list = [...campaignsList].filter(
    (c) => new Date(c.startDate) < new Date(c.endDate)
  );

  return list.filter((c) => {
    const campaignStart = new Date(c.startDate);
    const campaignEnd = new Date(c.endDate);

    const filterStart = dateRange.startDate ? new Date(dateRange.startDate) : null;
    const filterEnd = dateRange.endDate ? new Date(dateRange.endDate) : null;

    let dateInRange = true;
    if (filterStart && filterEnd) {
      const startInRange = campaignStart >= filterStart && campaignStart <= filterEnd;
      const endInRange = campaignEnd >= filterStart && campaignEnd <= filterEnd;
      dateInRange = startInRange || endInRange;
    }

    let matchesSearch = true;
    if (submit && searchTerm.trim()) {
      matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
    }

    return dateInRange && matchesSearch;
  });
}, [campaignsList, dateRange, searchTerm, submit]);


  return (
    <>
      <div className="flex justify-between align-center my-4">
        <DateRangePicker
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          onChange={(range) => setDateRange(range)}
          disabled={campaignsList?.length <= 0}

        />
        <SearchInput
          onChange={setSearchTerm}
          value={searchTerm}
          placeholder="Search by name..."
          setSubmit={setSubmit}
          disabled={campaignsList?.length <= 0}
        />
      </div>

      <Table
        columns={columns}
        data={filtered}
        loading={loading}
        error={error}
        tableWrapperClassnames="2xl:max-h-[550px] xl:max-h-[500px] lg:max-h-96"
      />
    </>
  );
}
