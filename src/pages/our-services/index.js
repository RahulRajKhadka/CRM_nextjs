import { useState, useEffect } from "react";

export default function OurServicesPage() {
  const [services, setServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newService, setNewService] = useState({
    name: "",
    title: "",
    description: "",
    image_link: "",
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(
          "https://crmapi.nitvtelecom.com/api/v1/guest_homepage/"
        );
        const data = await res.json();
        setServices(data?.data?.services || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching services:", error);
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleAddService = () => {
    if (newService.name && newService.title) {
      setServices([
        ...services,
        {
          id: services.length + 1,
          ...newService,
        },
      ]);
      setNewService({
        name: "",
        title: "",
        description: "",
        image_link: "",
      });
      setShowModal(false);
    }
  };

  const handleDelete = (id) => {
    setServices(services.filter((service) => service.id !== id));
  };

  const filteredServices = services.filter((service) => {
    return (
      service.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-gray-200 p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-[calc(100vh-1rem)] sm:h-[calc(100vh-2rem)] md:h-[calc(100vh-3rem)] lg:h-[calc(100vh-4rem)]">
        {/* Header */}
        <div className="border-b border-gray-200 px-4 pt-4 pb-3">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Our Services
          </h1>
        </div>

        {/* Search & Add */}
        <div className="py-3 sm:py-6 px-2 flex gap-3 sm:px-4 w-full">
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-xl py-4 px-3 sm:px-4 text-xs sm:text-sm  sm:py-4 bg-gray-100 rounded-lg placeholder-gray-300"
          />
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white md:text-sm text-xs px-4  rounded-md cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add New
          </button>
        </div>

        {/* Table Container */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="rounded-lg flex flex-col h-full">

            <div className="hidden md:flex md:flex-col h-full">
              <div className="grid grid-cols-4 w-full px-2 lg:px-4 text-xs lg:text-sm border-b border-gray-200 text-gray-400 py-6 lg:py-6 border-t bg-gray-50 z-10">
                {["Name", "Image", "Status", "Actions"].map((col) => (
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

              <div className="flex-1 overflow-auto">
                {loading ? (
                  <div className="flex items-center justify-center h-full text-gray-500 py-8">
                    Loading services...
                  </div>
                ) : filteredServices.length > 0 ? (
                  filteredServices.map((service) => (
                    <div
                      key={service.id}
                      className="grid grid-cols-4 w-full text-xs lg:text-sm hover:bg-gray-50 py-3"
                    >
                      <div className="flex justify-center items-center px-2 truncate">
                        {service.name}
                      </div>
                      <div className="flex justify-center items-center px-2">

                        <picture>
 <img
                          src={service.image_link}
                          alt={service.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        </picture>
                       
                      </div>
                     
                      <div className="flex justify-center items-center px-2 truncate">
                        {service.description}
                      </div>
                      <div className="flex justify-center items-center gap-2 px-2">
                        {/* Enable Button */}
                        <button
                          onClick={() =>
                            setServices(
                              services.map((s) =>
                                s.id === service.id
                                  ? { ...s, status: "enabled" }
                                  : s
                              )
                            )
                          }
                          className={`px-3 lg:px-4 border-2 border-transparent text-black text-md rounded-xs py-1.5 transition-colors ${
                            service.status === "enabled"
                              ? "bg-green-50 border-green-500"
                              : "hover:border-green-500 hover:bg-green-50"
                          }`}
                        >
                          Enable
                        </button>

                        {/* Disable Button */}
                        <button
                          onClick={() =>
                            setServices(
                              services.map((s) =>
                                s.id === service.id
                                  ? { ...s, status: "disabled" }
                                  : s
                              )
                            )
                          }
                          className={`px-3 lg:px-4 border-2 border-transparent text-black text-md rounded-xs py-1.5 transition-colors ${
                            service.status === "disabled"
                              ? "bg-red-50 border-red-500"
                              : "hover:border-red-500 hover:bg-red-50"
                          }`}
                        >
                          Disable
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500 py-8">
                    No services found
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden flex flex-col gap-3 overflow-auto pb-4 h-full px-2">
              {loading ? (
                <div className="flex items-center justify-center h-full text-gray-500 py-8">
                  Loading services...
                </div>
              ) : filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <div
                    key={service.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col items-center gap-3"
                  >
                    <img
                      src={service.image_link}
                      alt={service.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <p className="text-sm font-medium text-center">
                      {service.name}
                    </p>
                    <p className="text-xs text-gray-500 text-center">
                      {service.title}
                    </p>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 py-8">
                  No services found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

{/*      
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
              <input
                type="text"
                placeholder="Title"
                value={newService.title}
                onChange={(e) =>
                  setNewService({ ...newService, title: e.target.value })
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
              <input
                type="text"
                placeholder="Image URL"
                value={newService.image_link}
                onChange={(e) =>
                  setNewService({ ...newService, image_link: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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
      )} */}
    </div>
  );
}
