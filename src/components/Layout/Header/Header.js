function Header({ title, userName, userLocation }) {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          
          <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
        </div>
        
        <div className="flex items-center gap-2">
          
          <div>
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 border-gray-200 rounded-lg w-64 text-sm bg-gray-100 focus:outline-none "
            />
          </div>
         <div className="border-l h-9 border-gray-200"></div>

          <div className="flex items-center gap-2  ">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-purple-600 font-semibold">
                {userName?.charAt(0) || "U"}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{userName}</p>
              <p className="text-xs text-gray-500">{userLocation}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;