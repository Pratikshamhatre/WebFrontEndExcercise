import AddCampaignForm from "../features/campaigns/AddCampaignForm";
import CampaignTable from "../features/campaigns/CampaignTable";

export default function CampaignsPage() {
  return (
    <div className="m-5 pb-4"> 
      <h1 className="text-center my-5 font-bold xxl:text-2xl xl:text-xl lg:text-lg md:text-md sm:text-sm text-sm">Campaigns </h1>
      <AddCampaignForm />
      <CampaignTable />
    </div>
  );
}
