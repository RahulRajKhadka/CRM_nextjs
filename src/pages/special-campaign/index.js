// pages/special-campaign/index.js
import { useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Tabs from '../../components/Tabs';

export default function SpecialCampaignPage() {
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      title: 'Holiday Mega Sale',
      description: 'Get 50% off on all plans',
      startDate: '2024-12-01',
      endDate: '2024-12-31',
      discount: '50%',
      status: 'active'
    },
    {
      id: 2,
      title: 'New Year Bonanza',
      description: 'Extra 10GB data for free',
      startDate: '2024-01-01',
      endDate: '2024-01-15',
      discount: '10GB Free',
      status: 'active'
    },
    {
      id: 3,
      title: 'Student Special',
      description: 'Special rates for students',
      startDate: '2024-01-10',
      endDate: '2024-03-31',
      discount: '30%',
      status: 'inactive'
    },
  ]);

  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    discount: '',
    status: 'active'
  });

  const handleAddCampaign = () => {
    if (newCampaign.title && newCampaign.startDate && newCampaign.endDate) {
      setCampaigns([...campaigns, {
        id: campaigns.length + 1,
        ...newCampaign
      }]);
      setNewCampaign({ title: '', description: '', startDate: '', endDate: '', discount: '', status: 'active' });
      setShowModal(false);
    }
  };

  const handleToggleStatus = (id) => {
    setCampaigns(campaigns.map(campaign =>
      campaign.id === id
        ? { ...campaign, status: campaign.status === 'active' ? 'inactive' : 'active' }
        : campaign
    ));
  };

  const handleDelete = (id) => {
    setCampaigns(campaigns.filter(campaign => campaign.id !== id));
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'active') return matchesSearch && campaign.status === 'active';
    if (activeTab === 'inactive') return matchesSearch && campaign.status === 'inactive';
    return matchesSearch;
  });

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header title="Special Campaign" userName="Dolma Gurung" userLocation="Dolma" />
        
        <main className="flex-1 overflow-auto p-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Campaigns</h2>
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                + Add New Campaign
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
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mt-6 space-y-4">
              {filteredCampaigns.map((campaign) => (
                <div key={campaign.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-xl">{campaign.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          campaign.status === 'active' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {campaign.status}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{campaign.description}</p>
                      <div className="flex gap-6 text-sm text-gray-500">
                        <div>
                          <span className="font-medium">Start:</span> {campaign.startDate}
                        </div>
                        <div>
                          <span className="font-medium">End:</span> {campaign.endDate}
                        </div>
                        <div>
                          <span className="font-medium">Discount:</span> 
                          <span className="text-blue-600 font-semibold ml-1">{campaign.discount}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleToggleStatus(campaign.id)}
                        className="px-4 py-2 text-sm border border-blue-500 text-blue-600 rounded hover:bg-blue-50"
                      >
                        Toggle
                      </button>
                      <button
                        onClick={() => handleDelete(campaign.id)}
                        className="px-4 py-2 text-sm border border-red-500 text-red-600 rounded hover:bg-red-50"
                      >
                        Delete
                      </button>
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
            <h3 className="text-xl font-semibold mb-4">Add New Campaign</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Campaign Title"
                value={newCampaign.title}
                onChange={(e) => setNewCampaign({...newCampaign, title: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Description"
                value={newCampaign.description}
                onChange={(e) => setNewCampaign({...newCampaign, description: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
              />
              <input
                type="date"
                placeholder="Start Date"
                value={newCampaign.startDate}
                onChange={(e) => setNewCampaign({...newCampaign, startDate: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                placeholder="End Date"
                value={newCampaign.endDate}
                onChange={(e) => setNewCampaign({...newCampaign, endDate: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Discount (e.g., 50% or 10GB Free)"
                value={newCampaign.discount}
                onChange={(e) => setNewCampaign({...newCampaign, discount: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={newCampaign.status}
                onChange={(e) => setNewCampaign({...newCampaign, status: e.target.value})}
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
                  onClick={handleAddCampaign}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Add Campaign
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}