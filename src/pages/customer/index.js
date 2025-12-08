// pages/customer/index.js
import { useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Tabs from '../../components/Tabs';
import CustomerTable from '../../components/CustomerTable';
import Pagination from '../../components/Pagination';

export default function CustomerPage() {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'Dolma Gurung',
      email: 'dolmagurung@email.com',
      phone: '+81 5252 5252',
      status: 'approved'
    },
    {
      id: 2,
      name: 'Dolma Gurung',
      email: 'dolmagurung@email.com',
      phone: '+81 5252 5252',
      status: 'pending'
    },
    {
      id: 3,
      name: 'Dolma Gurung',
      email: 'dolmagurung@email.com',
      phone: '+81 5252 5252',
      status: 'approved'
    },
    {
      id: 4,
      name: 'Dolma Gurung',
      email: 'dolmagurung@email.com',
      phone: '+81 5252 5252',
      status: 'approved'
    },
    {
      id: 5,
      name: 'Dolma Gurung',
      email: 'dolmagurung@email.com',
      phone: '+81 5252 5252',
      status: 'approved'
    },
  ]);

  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleApprove = (id) => {
    setCustomers(customers.map(customer => 
      customer.id === id ? { ...customer, status: 'approved' } : customer
    ));
  };

  const handleReject = (id) => {
    setCustomers(customers.map(customer => 
      customer.id === id ? { ...customer, status: 'rejected' } : customer
    ));
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'approved') return matchesSearch && customer.status === 'approved';
    if (activeTab === 'reject') return matchesSearch && customer.status === 'rejected';
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header title="Customer" userName="Dolma Gurung" userLocation="Dolma" />
        
        <main className="flex-1 overflow-auto p-8">
          <div className="bg-white rounded-lg shadow-sm ">
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} count={customers.length} />
            
            <div className="mt-6">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-xl px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <CustomerTable 
              customers={paginatedCustomers}
              onApprove={handleApprove}
              onReject={handleReject}
            />

            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </main>
      </div>
    </div>
  );
}