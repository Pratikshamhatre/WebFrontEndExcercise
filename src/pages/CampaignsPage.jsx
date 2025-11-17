import AddCampaignForm from "../features/campaigns/AddCampaignForm";
import CampaignTable from "../features/campaigns/CampaignTable";

export default function CampaignsPage() {
  return (
    <div className="m-5 pb-4"> 
      <h1 className="text-center my-5 font-bold xxl:text-fluid-2xl xl:text-fluid-xl lg:text-fluid-lg md:text-fluid-md sm:text-fluid-sm text-fluid-sm">Campaigns </h1>
      <AddCampaignForm />
      <CampaignTable />
    </div>
  );
}
