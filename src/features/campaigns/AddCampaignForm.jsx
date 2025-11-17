import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCampaigns } from "../../store/campaignsSlice";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Select from "../../components/Select";
import { formatToMMDDYYYY } from "../../utils/dateUtils";

const AddCampaignForm = () => {
  const dispatch = useDispatch();
  const { usersList } = useSelector((state) => state.campaigns);
  const today = new Date().toISOString().split("T")[0];
  const [form, setForm] = useState({
    name: "",
    startDate: "",
    endDate: "",
    Budget: "",
    userId: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.startDate) newErrors.startDate = "Start date is required";

    if (!form.endDate) {
      newErrors.endDate = "End date is required";
    } else if (form.startDate && form.endDate < form.startDate) {
      newErrors.endDate = "End date must be after start date";
    }

    if (!form.Budget) newErrors.Budget = "Budget is required";
    if (form.Budget && form.Budget <= 0)
      newErrors.Budget = "Budget must be greater than 0";

    if (!form.userId) newErrors.userId = "User ID is required";
    if (form.userId && form.userId <= 0)
      newErrors.userId = "User ID must be positive";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    dispatch(
      addCampaigns({
        ...form,
        id: Math.random(),
        startDate: formatToMMDDYYYY(form.startDate),
        endDate: formatToMMDDYYYY(form.endDate),
        Budget: Number(form.Budget),
        userId: Number(form.userId),
      })
    );
    handleClear();
  };

  const handleClear = () => {
    setForm({
      name: "",
      startDate: "",
      endDate: "",
      Budget: "",
      userId: "",
    });

    setErrors({});
  };
  return (
    <div className="mb-4 border rounded-lg p-5 mb-5">
      <label
        className="block mb-1 font-medium text-fluid-lg text-center text-primary underline"
        htmlFor="campaign-input"
      >
        Add New Campaign
      </label>
      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-5">
        <div>
          <Input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
            id="name"
            label="Name"
          />
        </div>

        <div>
          <Input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            min={today}
            error={errors.startDate}
            id="startDate"
            label="Start Date"
          />
        </div>
        <div>
          <Input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            disabled={!form.startDate}
            min={form.startDate}
            error={errors.endDate}
            id="endDate"
            label="End Date"
          />
        </div>
        <div>
          <Input
            type="number"
            name="Budget"
            value={form.Budget}
            onChange={handleChange}
            error={errors.Budget}
            id="budget"
            label="Budget Date"
          />
        </div>
        <div>
          <Select
            options={usersList}
            name="userId"
            value={form.userId}
            error={errors.userId}
            labelKey="name"
            valueKey="id"
            onChange={handleChange}
            id="userId"
            label="User Id"
          />
        </div>

        <div className="flex gap-2 mt-2 justify-end items-end">
          <Button type="submit" className="h-max w-[100px]" rounded="md">
            Add
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={handleClear}
            className="h-max w-[100px]"
            rounded="md"
          >
            Clear
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddCampaignForm;
