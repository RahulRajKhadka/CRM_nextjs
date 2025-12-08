// pages/banner/index.js
import { useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Tabs from '../../components/Tabs';

export default function BannerPage() {
  const [banners, setBanners] = useState([
    {
      id: 1,
      title: 'Summer Sale 2024',
      image: '/banner1.jpg',
      status: 'active',
      createdDate: '2024-01-15'
    },
    {
      id: 2,
      title: 'New Year Offer',
      image: '/banner2.jpg',
      status: 'inactive',
      createdDate: '2024-01-10'
    },
    {
      id: 3,
      title: 'Special Discount',
      image: '/banner3.jpg',
      status: 'active',
      createdDate: '2024-01-20'
    },
  ]);

  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newBanner, setNewBanner] = useState({ title: '', image: '', status: 'active' });

  const handleAddBanner = () => {
    if (newBanner.title && newBanner.image) {
      setBanners([...banners, {
        id: banners.length + 1,
        ...newBanner,
        createdDate: new Date().toISOString().split('T')[0]
      }]);
      setNewBanner({ title: '', image: '', status: 'active' });
      setShowModal(false);
    }
  };

  const handleToggleStatus = (id) => {
    setBanners(banners.map(banner =>
      banner.id === id
        ? { ...banner, status: banner.status === 'active' ? 'inactive' : 'active' }
        : banner
    ));
  };

  const handleDelete = (id) => {
    setBanners(banners.filter(banner => banner.id !== id));
  };

  const filteredBanners = banners.filter(banner => {
    const matchesSearch = banner.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'active') return matchesSearch && banner.status === 'active';
    if (activeTab === 'inactive') return matchesSearch && banner.status === 'inactive';
    return matchesSearch;
  });

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header title="Banner Management" userName="Dolma Gurung" userLocation="Dolma" />
        
        <main className="flex-1 overflow-auto p-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Banners</h2>
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                + Add New Banner
              </button>
            </div>

            <Tabs 
              activeTab={activeTab} 
              setActiveTab={setActiveTab}
              tabs={[
                { id: 'all', label: 'All' },
                { id: 'active', label: 'Active' },
                { id: 'inactive', label: 'Inactive' }
              ]}
            />
            
            <div className="mt-6">
              <input
                type="text"
                placeholder="Search banners..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBanners.map((banner) => (
                <div key={banner.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Banner Image</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{banner.title}</h3>
                    <p className="text-sm text-gray-500 mb-3">Created: {banner.createdDate}</p>
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        banner.status === 'active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {banner.status}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleToggleStatus(banner.id)}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          Toggle
                        </button>
                        <button
                          onClick={() => handleDelete(banner.id)}
                          className="text-sm text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-xl font-semibold mb-4">Add New Banner</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Banner Title"
                value={newBanner.title}
                onChange={(e) => setNewBanner({...newBanner, title: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newBanner.image}
                onChange={(e) => setNewBanner({...newBanner, image: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={newBanner.status}
                onChange={(e) => setNewBanner({...newBanner, status: e.target.value})}
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
                  onClick={handleAddBanner}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Add Banner
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}