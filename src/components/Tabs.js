// components/Tabs.js
export default function Tabs({ activeTab, setActiveTab, tabs, count }) {
  
  const defaultTabs = [
    { id: 'all', label: 'All' },
    { id: 'approved', label: 'Approved' },
    { id: 'reject', label: 'Reject' },
  ];

  const tabList = tabs || defaultTabs;

  return (
    <div className="flex border-b border-gray-200">
      {tabList.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-6 py-3 text-sm font-medium transition-colors ${
            activeTab === tab.id
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}