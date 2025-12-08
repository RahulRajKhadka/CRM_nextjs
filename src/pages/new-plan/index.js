// pages/new-plan/index.js
import { useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Tabs from '../../components/Tabs';

export default function NewPlanPage() {
  const [plans, setPlans] = useState([
    {
      id: 1,
      name: 'Basic Plan',
      price: '$29',
      duration: 'Monthly',
      features: ['5GB Data', '100 Minutes', 'SMS Unlimited'],
      status: 'active'
    },
    {
      id: 2,
      name: 'Premium Plan',
      price: '$59',
      duration: 'Monthly',
      features: ['20GB Data', 'Unlimited Minutes', 'SMS Unlimited', '5G Network'],
      status: 'active'
    },
    {
      id: 3,
      name: 'Enterprise Plan',
      price: '$99',
      duration: 'Monthly',
      features: ['Unlimited Data', 'Unlimited Minutes', 'SMS Unlimited', '5G Network', 'Priority Support'],
      status: 'inactive'
    },
  ]);

  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newPlan, setNewPlan] = useState({
    name: '',
    price: '',
    duration: 'Monthly',
    features: '',
    status: 'active'
  });

  const handleAddPlan = () => {
    if (newPlan.name && newPlan.price) {
      setPlans([...plans, {
        id: plans.length + 1,
        ...newPlan,
        features: newPlan.features.split(',').map(f => f.trim())
      }]);
      setNewPlan({ name: '', price: '', duration: 'Monthly', features: '', status: 'active' });
      setShowModal(false);
    }
  };

  const handleToggleStatus = (id) => {
    setPlans(plans.map(plan =>
      plan.id === id
        ? { ...plan, status: plan.status === 'active' ? 'inactive' : 'active' }
        : plan
    ));
  };

  const handleDelete = (id) => {
    setPlans(plans.filter(plan => plan.id !== id));
  };

  const filteredPlans = plans.filter(plan => {
    const matchesSearch = plan.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'active') return matchesSearch && plan.status === 'active';
    if (activeTab === 'inactive') return matchesSearch && plan.status === 'inactive';
    return matchesSearch;
  });

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header title="Plan Management" userName="Dolma Gurung" userLocation="Dolma" />
        
        <main className="flex-1 overflow-auto p-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Plans</h2>
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                + Add New Plan
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
                placeholder="Search plans..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlans.map((plan) => (
                <div key={plan.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-xl">{plan.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      plan.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {plan.status}
                    </span>
                  </div>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-blue-600">{plan.price}</span>
                    <span className="text-gray-500 ml-2">/ {plan.duration}</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-2 pt-4 border-t">
                    <button
                      onClick={() => handleToggleStatus(plan.id)}
                      className="flex-1 px-3 py-2 text-sm border border-blue-500 text-blue-600 rounded hover:bg-blue-50"
                    >
                      Toggle Status
                    </button>
                    <button
                      onClick={() => handleDelete(plan.id)}
                      className="px-3 py-2 text-sm border border-red-500 text-red-600 rounded hover:bg-red-50"
                    >
                      Delete
                    </button>
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
            <h3 className="text-xl font-semibold mb-4">Add New Plan</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Plan Name"
                value={newPlan.name}
                onChange={(e) => setNewPlan({...newPlan, name: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Price (e.g., $29)"
                value={newPlan.price}
                onChange={(e) => setNewPlan({...newPlan, price: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={newPlan.duration}
                onChange={(e) => setNewPlan({...newPlan, duration: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
              <textarea
                placeholder="Features (comma separated)"
                value={newPlan.features}
                onChange={(e) => setNewPlan({...newPlan, features: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
              />
              <select
                value={newPlan.status}
                onChange={(e) => setNewPlan({...newPlan, status: e.target.value})}
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
                  onClick={handleAddPlan}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Add Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}