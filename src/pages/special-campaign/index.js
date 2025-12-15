import { useState, useEffect } from "react";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("active");

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await fetch(
          "https://crmapi.nitvtelecom.com/api/v1/guest_homepage/"
        );
        const data = await res.json();
        setCampaigns(data?.data?.campaign || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

 const filteredCampaigns = campaigns.filter((campaign) => {
  const matchesSearch =
    campaign.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campaign.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campaign.type?.toLowerCase().includes(searchQuery.toLowerCase());

  if (activeTab === "running")
    return matchesSearch && campaign.status === "running";
  if (activeTab === "completed")
    return matchesSearch && campaign.status === "completed";
  if (activeTab === "paused")
    return matchesSearch && campaign.status === "paused";

  return matchesSearch;
});


  return (
    <div className="min-h-screen bg-gray-200 p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-[calc(100vh-1rem)] sm:h-[calc(100vh-2rem)] md:h-[calc(100vh-3rem)] lg:h-[calc(100vh-4rem)]">
        
            <div className="flex border-b border-gray-200 justify-start gap-2 sm:gap-4 px-2 sm:px-4 pt-3 sm:pt-4 overflow-x-auto">
          {["All", "approved", "reject"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-bold transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? "border-b-2 border-[#309fed] text-[#309fed]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
       

        {/* Search */}
        <div className="py-3 sm:py-6 px-2 flex gap-3 sm:px-4 w-full">
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-xl  px-3 sm:px-4 text-xs sm:text-sm py-3 sm:py-4 bg-gray-100 rounded-lg placeholder-gray-300"
          />
          <div class="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white md:text-sm text-xs px-4 py-2 rounded-md cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add New
          </div>
        </div>

        {/* Table Container */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="rounded-lg flex flex-col h-full">

            {/* Desktop Table View */}
            <div className="hidden md:flex md:flex-col h-full">
              <div className="grid grid-cols-5 w-full px-2 lg:px-4 text-xs lg:text-sm border-b border-gray-200 text-gray-400 py-6 lg:py-6 border-t bg-gray-50 z-10">
                {["Name", "Image", "Title", "Status", "Actions"].map(
                  (col) => (
                    <div key={col} className="flex justify-center">
                      <div className="flex items-center gap-1 lg:gap-2 font-medium">
                        <span>{col}</span>
                        {/* Sort SVG */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-3 lg:w-5 lg:h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                          />
                        </svg>
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* Table Body */}
              <div className="flex-1 overflow-auto">
                {loading ? (
                  <div className="flex items-center justify-center h-full text-gray-500 py-8">
                    Loading campaigns...
                  </div>
                ) : filteredCampaigns.length > 0 ? (
                  filteredCampaigns.map((campaign) => (
                    <div
                      key={campaign.id}
                      className="grid grid-cols-5 w-full text-xs lg:text-sm hover:bg-gray-50 py-3 "
                    >
                      <div className="flex justify-center items-center px-2 truncate">
                        {campaign.name}
                      </div>
                      <div className="flex justify-center items-center px-2">
                        <img
                          src={campaign.image_link}
                          alt={campaign.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </div>

                      <div className="flex justify-center items-center px-2 truncate">
                        {campaign.title}
                      </div>

                      <div className="flex justify-center items-center px-2">
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                          {campaign.link_type}
                        </span>
                      </div>
<div className="flex justify-center items-center gap-2 px-2">
  {campaign.status !== "approved" && (
    <button
      onClick={() => handleApprove(campaign.id)}
      className="px-3 lg:px-4 border-2 border-transparent text-black text-md rounded-xs py-1.5 hover:border-green-500 hover:bg-green-50 transition-colors"
    >
      Enable
    </button>
  )}
  {campaign.status !== "rejected" && (
    <button
      onClick={() => handleReject(campaign.id)}
      className="px-3 lg:px-4 border-2 border-transparent text-black text-md rounded-xs py-1.5 hover:border-red-500 hover:bg-red-50 transition-colors"
    >
      Disable
    </button>
  )}
  {(campaign.status === "approved" || campaign.status === "rejected") && (
    <span className="text-center text-xs lg:text-sm font-medium">
      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
    </span>
  )}
</div>

                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500 py-8">
                    No campaigns found
                  </div>
                )}
              </div>
            </div>
<div className="md:hidden flex flex-col gap-3 overflow-auto pb-4 h-full px-2">
  {loading ? (
    <div className="flex items-center justify-center h-full text-gray-500 py-8">
      Loading campaigns...
    </div>
  ) : filteredCampaigns.length > 0 ? (
    filteredCampaigns.map((campaign) => (
      <div
        key={campaign.id}
        className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col items-center gap-3"
      >
        {/* Campaign Image */}
        <img
          src={campaign.image_link}
          alt={campaign.name}
          className="w-24 h-24 object-cover rounded"
        />

        {/* Campaign Name */}
        <p className="text-sm font-medium text-center">{campaign.name}</p>
      </div>
    ))
  ) : (
    <div className="flex items-center justify-center h-full text-gray-500 py-8">
      No campaigns found
    </div>
  )}
</div>

          </div>
        </div>
      </div>
    </div>
  );
}
