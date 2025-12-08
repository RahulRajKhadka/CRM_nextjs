import { useState, useEffect } from "react";
import CustomerRow from "./CustomerRow";
import Pagination from "./Pagination";

export default function CustomerTable() {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalData, setTotalData] = useState(0);

  const perPage = 6;

  useEffect(() => {
    const fetchCustomers = async () => {
      const res = await fetch(`https://stgcrmapi.nitvtelecom.com/api/v1/customers?page=${page}&per_page=${perPage}&sort_by=created_at&sort_order=asc&customer_type=customers_all`);
      const data = await res.json();
      console.log(data.data.items);
      setCustomers(data?.data.items || []);
      setTotalPages(data?.total_pages || 1);
      setTotalData(data?.total || 0);
    };

    fetchCustomers();
  }, [page]);

  return (
    <>
      <div className="bg-white shadow mt-4 rounded-lg overflow-hidden">
        <div className="flex bg-gray-100 p-3 font-semibold text-gray-700">
          <div className="flex-1">Name</div>
          <div className="flex-1">Email</div>
          <div className="flex-1">Phone</div>
          <div className="flex-1">Action</div>
        </div>

        <div className="flex flex-col">
          {customers.map((customer) => (
            <CustomerRow key={customer.id} customer={customer} />
          ))}
        </div>
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        totalData={totalData}
        onPageChange={setPage}
      />
    </>
  );
}
