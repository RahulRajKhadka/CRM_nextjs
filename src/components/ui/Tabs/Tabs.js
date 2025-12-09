import { useState } from "react";

function Tabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.value);

  return (
    <div className="flex gap-4 border-gray-200 border-b ">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => setActiveTab(tab.value)}
          className={`
            px-4 py-2 text-sm text-gray-600 
            border-b-2 
            ${activeTab === tab.value ? "border-blue-500 text-blue-600" : "border-transparent"}
            hover:border-blue-500 hover:text-blue-600
            transition-colors
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
