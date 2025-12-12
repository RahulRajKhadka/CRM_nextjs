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
    pages.push(1);

    if (totalPages <= 5) {
      for (let i = 2; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    let start = currentPage - 1;
    let end = currentPage + 1;

    if (start < 2) {
      start = 2;
      end = 4;
    }

    if (end > totalPages - 1) {
      end = totalPages - 1;
      start = totalPages - 3;
    }

    if (start > 2) pages.push("...");

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) pages.push("...");

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
    <div className="min-h-screen bg-gray-200 p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-[calc(100vh-1rem)] sm:h-[calc(100vh-2rem)] md:h-[calc(100vh-3rem)] lg:h-[calc(100vh-4rem)]">
        {/* Tabs */}
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
        <div className="py-3 sm:py-6 px-2 sm:px-4 w-full">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-xl sm:min-w-[300px] px-3 sm:px-4 text-xs sm:text-sm py-2 sm:py-3 bg-gray-100 rounded-lg  placeholder-gray-300"
          />
        </div>

        {/* Table Container */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="rounded-lg flex flex-col h-full">
            <div className="hidden md:flex md:flex-col h-full">
              <div className="grid grid-cols-6 w-full px-2 lg:px-4 text-xs lg:text-sm border-b border-gray-200 text-gray-400 py-6 lg:py-6 border-t bg-gray-50 z-10">
                {[
                  "Customer",
                  "Name",
                  "Company",
                  "Email",
                  "Phone",
                  "Actions",
                ].map((col, index) => (
                  <div key={col} className="flex justify-center">
                    <div className="flex items-center gap-1 lg:gap-2 font-medium">
                      <span>{col}</span>
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

              {/* Table Body - Scrollable with explicit height */}
              <div className="flex-1 overflow-auto max-h-[calc(100vh-300px)]">
                {paginatedCustomers.length > 0 ? (
                  paginatedCustomers.map((customer) => (
                    <div
                      key={customer.id}
                      className="grid grid-cols-6 w-full text-xs lg:text-sm hover:bg-gray-50  py-3"
                    >
                      <div className="flex justify-center items-center px-2 truncate">
                        {customer.customer_number || "N/A"}
                      </div>

                      <div className="flex justify-center items-center px-2 truncate">
                        {customer.first_name} {customer.last_name}
                      </div>

                      <div className="flex justify-center items-center px-2 truncate">
                        {customer.company_type || "Individual"}
                      </div>

                      <div className="flex justify-center items-center px-2 truncate">
                        {customer.email}
                      </div>

                      <div className="flex justify-center items-center px-2 truncate">
                        {customer.phone}
                      </div>

                      <div className="flex justify-center items-center gap-2 px-2">
                        {customer.status !== "approved" && (
                          <button
                            onClick={() => handleApprove(customer.id)}
                            className="px-3 lg:px-4 border-2 border-transparent text-black text-md rounded-xs py-1.5 hover:border-green-500 hover:bg-green-50 transition-colors"
                          >
                            Approve
                          </button>
                        )}
                        {customer.status !== "rejected" && (
                          <button
                            onClick={() => handleReject(customer.id)}
                            className="px-3 lg:px-4 border-2 border-transparent text-black text-md rounded-xs py-1.5 hover:border-red-500 hover:bg-red-50 transition-colors"
                          >
                            Reject
                          </button>
                        )}
                        {(customer.status === "approved" ||
                          customer.status === "rejected") && (
                          <span className="text-center text-xs lg:text-sm font-medium">
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

            {/* Mobile Card View */}
            <div className="md:hidden flex flex-col gap-3 overflow-auto pb-4 h-full">
              {paginatedCustomers.length > 0 ? (
                paginatedCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs text-gray-500">Customer #</p>
                          <p className="text-sm font-semibold">
                            {customer.customer_number || "N/A"}
                          </p>
                        </div>
                        {(customer.status === "approved" ||
                          customer.status === "rejected") && (
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              customer.status === "approved"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {customer.status.charAt(0).toUpperCase() +
                              customer.status.slice(1)}
                          </span>
                        )}
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">Name</p>
                        <p className="text-sm font-medium">
                          {customer.first_name} {customer.last_name}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">Company</p>
                        <p className="text-sm">
                          {customer.company_type || "Individual"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="text-sm truncate">{customer.email}</p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">Phone</p>
                        <p className="text-sm">{customer.phone}</p>
                      </div>

                      {customer.status !== "approved" &&
                        customer.status !== "rejected" && (
                          <div className="flex gap-2 pt-2">
                            <button
                              onClick={() => handleApprove(customer.id)}
                              className="flex-1 px-4 text-black text-xs rounded py-2 border-2 hover:hover:border-green-500 transition-colors font-medium"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(customer.id)}
                              className="flex-1 px-4 hover:border-red-500 text-black border-2 rounded text-xs py-2 transition-colors font-medium"
                            >
                              Reject
                            </button>
                          </div>
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
        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 py-4 sm:py-6 px-3 sm:px-6 bg-gray-50 border-t border-gray-200 flex-shrink-0">
          <div className="text-gray-700 text-xs flex items-center gap-2">
            <span>Show result:</span>
            <span className="border border-gray-300 text-xs font-semibold pr-6 sm:pr-8 sm:py-1.5 pl-2 py-1 rounded">
              {itemsPerPage}
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto">
            {pages.map((p, index) =>
              p === "..." ? (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 text-gray-400 text-xs"
                >
                  ...
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`px-2 sm:px-3 py-1.5 sm:py-2 text-xs rounded-lg sm:rounded-lg ${
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
