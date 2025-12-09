import Pagination from "../../components/ui/Pagination/Pagination.js";
import SearchInput from "../../components/ui/SearchInput/SerchInput.js";
import Table from "../../components/ui/Table/CustomerTable.js";
import Tabs from "../../components/ui/Tabs/Tabs.js";
import { useEffect, useState } from "react";
import CustomerRow from "../../components/ui/Table/CustomerRow.js";
import Sidebar from "../../components/Layout/Siderbar/Sidebar.js";
import Header from "../../components/Layout/Header/Header.js";
import axiosInstance from "../../lib/axios/axios_instance.js";
import TableHeader from "@/components/ui/Table/TableHeader.js";

export default function CustomerPage() {
  const [customers, setCustomers] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [loading, setLoading] = useState(false);

  const perPage = 6;

  const tabs = [
    { label: "All", value: "all" },
    { label: "Approved", value: "approved" },
    { label: "Reject", value: "reject" },
  ];

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `customers?page=${currentPage}&per_page=${perPage}&sort_by=created_at&sort_order=asc&customer_type=customers_all`
      );
      console.log(response, "resp");

      let items = response?.data?.data?.items || [];
      console.log("Fetched Items:", items);

      setCustomers(items);
      setTotalPages(response?.data?.data?.total_pages || 1);
      setTotalData(response?.data?.data?.total || 0);
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [currentPage]);

  return (
    <div className="flex h-screen bg-gray-400 ">
  <Sidebar />

  <div className="flex-1 flex flex-col overflow-hidden">
    <Header
        title="Customer"
        userName="Dolma Gurung"
        userLocation="Kathmandu, Nepal"
      />
    <div className="p-4">
      {/* Header */}
      

      {/* Table Container */}
      <div className="table-container rounded-lg bg-white mt-4 flex flex-col h-[calc(100vh-80px)]">
        {/* Tabs & Search */}
        <div className="p-6">
          <Tabs tabs={tabs} />
          <div className="mt-6">
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, or phone..."
            />
          </div>
        </div>

        {/* Table Header */}
        <TableHeader headers={["Name", "Email", "Phone", "Action"]} />

        {/* Scrollable Table Rows */}
        <div className="flex-1 overflow-auto bg-white">
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : customers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No customers found
            </div>
          ) : (
            <Table>
              {customers.map((customer) => (
                <CustomerRow key={customer.id} customer={customer} />
              ))}
            </Table>
          )}
        </div>

        {/* Pagination */}
        <div className="p-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalData}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  </div>
</div>

  );
}