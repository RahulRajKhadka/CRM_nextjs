// pages/our-services/index.js
import { useState } from "react";
import Header from "../../components/Layout/Header/Header";
import Sidebar from "../../components/Layout/Siderbar/Sidebar";
import Tabs from "../../components/ui/Tabs/Tabs";

export default function OurServicesPage() {
  const [services, setServices] = useState([
    {
      id: 1,
      name: "Mobile Internet",
      description: "High-speed 4G/5G mobile internet service",
      category: "Internet",
      price: "$19.99",
      status: "active",
    },
    {
      id: 2,
      name: "International Roaming",
      description: "Stay connected while traveling abroad",
      category: "Roaming",
      price: "$9.99",
      status: "active",
    },
    {
      id: 3,
      name: "Cloud Storage",
      description: "50GB secure cloud storage for your data",
      category: "Additional",
      price: "$4.99",
      status: "active",
    },
    {
      id: 4,
      name: "Family Plan",
      description: "Connect up to 5 family members",
      category: "Plans",
      price: "$79.99",
      status: "inactive",
    },
  ]);

  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    category: "Internet",
    price: "",
    status: "active",
  });

  const handleAddService = () => {
    if (newService.name && newService.price) {
      setServices([
        ...services,
        {
          id: services.length + 1,
          ...newService,
        },
      ]);
      setNewService({
        name: "",
        description: "",
        category: "Internet",
        price: "",
        status: "active",
      });
      setShowModal(false);
    }
  };

  const handleToggleStatus = (id) => {
    setServices(
      services.map((service) =>
        service.id === id
          ? {
              ...service,
              status: service.status === "active" ? "inactive" : "active",
            }
          : service
      )
    );
  };

  const handleDelete = (id) => {
    setServices(services.filter((service) => service.id !== id));
  };

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.category.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "active")
      return matchesSearch && service.status === "active";
    if (activeTab === "inactive")
      return matchesSearch && service.status === "inactive";
    return matchesSearch;
  });

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header
          title="Our Services"
          userName="Dolma Gurung"
          userLocation="Dolma"
        />

        <main className="flex-1 overflow-auto p-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Services</h2>
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                + Add New Service
              </button>
            </div>

            <Tabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabs={[
                { id: "all", label: "All" },
                { id: "active", label: "Active" },
                { id: "inactive", label: "Inactive" },
              ]}
            />

            <div className="mt-6">
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">
                      Service Name
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">
                      Description
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">
                      Category
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">
                      Price
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">
                      Status
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredServices.map((service) => (
                    <tr
                      key={service.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 px-4 text-sm font-medium text-gray-900">
                        {service.name}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {service.description}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                          {service.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm font-semibold text-gray-900">
                        {service.price}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            service.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {service.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleToggleStatus(service.id)}
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            Toggle
                          </button>
                          <button
                            onClick={() => handleDelete(service.id)}
                            className="text-sm text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-xl font-semibold mb-4">Add New Service</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Service Name"
                value={newService.name}
                onChange={(e) =>
                  setNewService({ ...newService, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Description"
                value={newService.description}
                onChange={(e) =>
                  setNewService({ ...newService, description: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
              />
              <select
                value={newService.category}
                onChange={(e) =>
                  setNewService({ ...newService, category: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Internet">Internet</option>
                <option value="Roaming">Roaming</option>
                <option value="Plans">Plans</option>
                <option value="Additional">Additional</option>
              </select>
              <input
                type="text"
                placeholder="Price (e.g., $19.99)"
                value={newService.price}
                onChange={(e) =>
                  setNewService({ ...newService, price: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={newService.status}
                onChange={(e) =>
                  setNewService({ ...newService, status: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddService}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Add Service
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
