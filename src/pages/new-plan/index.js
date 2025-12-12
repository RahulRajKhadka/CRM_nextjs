import { useState, useEffect } from "react";

export default function PlansPage() {
  const [plans, setPlans] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch(
          "https://crmapi.nitvtelecom.com/api/v1/guest_homepage/"
        );
        const data = await res.json();
        setPlans(data?.data?.plan || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching plans:", error);
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const filteredPlans = plans.filter((plan) => {
    return (
      plan.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-gray-200 p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-[calc(100vh-1rem)] sm:h-[calc(100vh-2rem)] md:h-[calc(100vh-3rem)] lg:h-[calc(100vh-4rem)]">
        {/* Header */}
        <div className="border-b border-gray-200 px-4 pt-4 pb-3">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Plans</h1>
        </div>

        {/* Search */}
        <div className="py-3 sm:py-6 px-2 sm:px-4  flex gap-4 w-full">
          <input
            type="text"
            placeholder="Search plans..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className=" px-3 w-lg sm:px-4 text-xs sm:text-sm py-2 sm:py-3 bg-gray-100 rounded-lg placeholder-gray-300"
          />
          <div class="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer">

  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
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
  {["ID", "Image", "Name", "Title", "Description"].map((col) => (
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
  ))}
</div>


              {/* Table Body */}
              <div className="flex-1 overflow-auto">
                {loading ? (
                  <div className="flex items-center justify-center h-full text-gray-500 py-8">
                    Loading plans...
                  </div>
                ) : filteredPlans.length > 0 ? (
                  filteredPlans.map((plan) => (
                    <div
                      key={plan.id}
                      className="grid grid-cols-5 w-full text-xs lg:text-sm hover:bg-gray-50 py-3 border-b border-gray-100"
                    >
                      <div className="flex justify-center items-center px-2">
                        {plan.id}
                      </div>

                      <div className="flex justify-center items-center px-2">

                        <picture>

 <img
                          src={plan.image_link}
                          alt={plan.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                        </picture>
                       
                      </div>

                      <div className="flex justify-center items-center px-2 truncate">
                        {plan.name}
                      </div>

                      <div className="flex justify-center items-center px-2 truncate">
                        {plan.title}
                      </div>

                      <div className="flex justify-center items-center px-2">
                        <span className="line-clamp-2">{plan.description}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500 py-8">
                    No plans found
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden flex flex-col gap-3 overflow-auto pb-4 h-full px-2">
              {loading ? (
                <div className="flex items-center justify-center h-full text-gray-500 py-8">
                  Loading plans...
                </div>
              ) : filteredPlans.length > 0 ? (
                filteredPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs text-gray-500">Plan ID</p>
                          <p className="text-sm font-semibold">{plan.id}</p>
                        </div>
                      </div>

                      <div className="flex justify-center">

                        <picture>
 <img
                          src={plan.image_link}
                          alt={plan.name}
                          className="w-24 h-24 object-cover rounded"
                        />

                        </picture>
                       
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">Name</p>
                        <p className="text-sm font-medium">{plan.name}</p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">Title</p>
                        <p className="text-sm">{plan.title}</p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">Description</p>
                        <p className="text-sm text-gray-600">
                          {plan.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 py-8">
                  No plans found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}