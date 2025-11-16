import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCampaigns } from "../../store/campaignsSlice";
import Button from "../../components/Button";
import TextArea from "../../components/TextArea.jsx";
import { showSuccessToast } from "../../components/Toast";

export default function AddCampaignForm() {
  const [text, setText] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const onAdd = () => {
    try {
      const parsed = JSON.parse(text);

      if (!Array.isArray(parsed)) {
        setError("Please provide an array of campaigns");
        return;
      }

      dispatch(addCampaigns(parsed));
      setText("");
      setError(null);
      showSuccessToast("Campaigns saved successfully!");
    } catch {
      setError("Invalid JSON");
    }
  };

  const handleChange = (e) => {
    setError(null);
    setText(e.target.value);
  };

  const handleClear = () => {
    setText("");
    setError(null);
  };

  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium" htmlFor="campaign-input">
        Add campaigns
      </label>

      <TextArea
        value={text}
        onChange={handleChange}
        placeholder="Please paste JSON array"
        rows={6}
        className={error ? "border-danger" : ""}
        id="campaign-input"

      />

      {error && <div className="text-red-500 ml-2">{error}</div>}

      <div className="flex gap-2 mt-2 justify-end">
        <Button type="button" onClick={onAdd} className="h-max" rounded="md">
          Add
        </Button>

        <Button
          type="button"
          variant="secondary"
          onClick={handleClear}
          className="h-max"
          rounded="md"
        >
          Clear
        </Button>
      </div>
    </div>
  );
}
