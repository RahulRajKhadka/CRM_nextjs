import { useState, useEffect } from "react";

export default function CustomerApproveList() {
  const [customers, setCustomers] = useState([]);
  const [activeTab, setActiveTab] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const itemsPerPage = 6;

  const columns = [
    { label: "Name", sort_key: "customer_number" },
    { label: "Display Name", sort_key: "first_name" },
    { label: "Company Type", sort_key: "company_type" },
    { label: "Email", sort_key: "email" },
    { label: "Phone", sort_key: "phone" },
    { label: "Action", sort_key: "action" },
  ];

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch(
          `https://stgcrmapi.nitvtelecom.com/api/v1/customers?page=${currentPage}&per_page=${itemsPerPage}&sort_by=created_at&sort_order=asc&customer_type=customers_all`
        );
        const data = await res.json();
        setCustomers(data?.data?.items || []);
        setTotalPages(data?.data?.total_pages || 1);
        setTotalData(data?.data?.total || 0);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, [currentPage]);

  const handleApprove = (id) => {
    setCustomers(
      customers.map((customer) =>
        customer.id === id ? { ...customer, status: "approved" } : customer
      )
    );
  };

  const handleReject = (id) => {
    setCustomers(
      customers.map((customer) =>
        customer.id === id ? { ...customer, status: "rejected" } : customer
      )
    );
  };

  const getPages = () => {
    const pages = [];

    // Always show 1
    pages.push(1);

    if (totalPages <= 5) {
      // If few pages → show all
      for (let i = 2; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    // Middle pages logic (always 3 pages)
    let start = currentPage - 1;
    let end = currentPage + 1;

    // Adjust if near left
    if (start < 2) {
      start = 2;
      end = 4;
    }

    // Adjust if near right
    if (end > totalPages - 1) {
      end = totalPages - 1;
      start = totalPages - 3;
    }

    // Add left dots if needed
    if (start > 2) pages.push("...");

    // Add middle 3 pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add right dots if needed
    if (end < totalPages - 1) pages.push("...");

    // Always show last page
    pages.push(totalPages);

    return pages;
  };

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "active")
      return (
        matchesSearch &&
        customer.status !== "approved" &&
        customer.status !== "rejected"
      );
    if (activeTab === "approved")
      return matchesSearch && customer.status === "approved";
    if (activeTab === "reject")
      return matchesSearch && customer.status === "rejected";

    return matchesSearch;
  });

  const paginatedCustomers = filteredCustomers;
  const pages = getPages();

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <div className="bg-white rounded-lg shadow-sm  overflow-hidden flex flex-col h-[calc(100vh-4rem)]">
      
        <div className="flex border-b border-gray-200  justify-start gap-4 px-4 pt-4 ">
          {["All", "approved", "reject"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2   py-3 text-xs font-bold transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-[#309fed] text-[#309fed]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* SEARCH BAR - Fixed */}
        <div className=" py-4 px-4  w-full ">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-lg px-4 text-xs py-4  bg-gray-100 rounded-lg"
          />
        </div>
      
        <div className="flex-1 overflow-hidden">
          <div className="rounded-lg h-full flex flex-col">
       
            <div className="grid grid-cols-6 w-full px-3 text-sm border-b border-gray-200 py-4 border-t flex-shrink-0">
              {[
                "Customer ",
                "Name",
                "Company",
                "Email",
                "Phone",
                "Actions",
              ].map((col, index) => (
                <div
                  key={col}
                  className={`flex items-center gap-2 ${
                    index === 5 ? "justify-center" : "justify-start"
                  }`}
                >
                  {col}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                    />
                  </svg>
                </div>
              ))}
            </div>

            {/* Scrollable table body */}
            <div className="flex flex-col py-4 overflow-auto px-3">
              {paginatedCustomers.length > 0 ? (
                paginatedCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    className="grid grid-cols-6 w-full text-xs hover:bg-gray-50 border-b border-gray-100 py-3"
                  >
                    {/* Customer Number */}
                    <div className="flex items-center px-2 truncate">
                      {customer.customer_number || "N/A"}
                    </div>

                    {/* Name */}
                    <div className="flex items-center px-2 truncate">
                      {customer.first_name} {customer.last_name}
                    </div>

                    {/* Company */}
                    <div className="flex items-center px-2 truncate">
                      {customer.company_type || "Individual"}
                    </div>

                    {/* Email */}
                    <div className="flex items-center px-2 truncate">
                      {customer.email}
                    </div>

                    {/* Phone */}
                    <div className="flex items-center px-2">
                      {customer.phone}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-center px-2 gap-2">
                      {customer.status !== "approved" && (
                        <button
                          onClick={() => handleApprove(customer.id)}
                          className="px-4 border-green-500 text-black text-xs rounded-xs py-1.5 border-2 hover:bg-green-50"
                        >
                          Approved
                        </button>
                      )}
                      {customer.status !== "rejected" && (
                        <button
                          onClick={() => handleReject(customer.id)}
                          className="px-4 border-red-500 text-black border-2 rounded-xs text-xs py-1.5 hover:bg-red-50"
                        >
                          Reject
                        </button>
                      )}
                      {(customer.status === "approved" ||
                        customer.status === "rejected") && (
                        <span className="text-center text-sm">
                          {customer.status.charAt(0).toUpperCase() +
                            customer.status.slice(1)}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 py-8">
                  No customers found
                </div>
              )}
            </div>
          </div>
        </div>
        {/* PAGINATION - Fixed at bottom */}
        <div className="flex justify-between items-center py-6 px-6 bg-gray-50 border-t  border-gray-200 flex-shrink-0">
          <div className="text-gray-700 text-xs flex items-center gap-2">
            <span>Show result:</span>
            <span className="border border-gray-300 text-xs  font-semibold pr-8 pl-2 py-1  rounded ">
              {currentPage}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {pages.map((p, index) =>
              p === "..." ? (
                <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
                  ...
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`px-3 py-2  text-xs rounded-xl ${
                    p === currentPage
                      ? "bg-[#d1eafd] text-blue-600 font-semibold border-blue-400"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {p}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  class="size-6"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
  />
</svg>;
