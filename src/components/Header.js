export default function Header() {
  return (
    <div className="w-full h-16 bg-white shadow flex justify-between items-center px-6">

    
      <div className="text-xl font-semibold">
        Banner
      </div>

      <div className="flex items-center gap-6">

     
        <input
          type="text"
          placeholder="Search..."
          className=" rounded-lg px-4 py-2 w-48 outline-none bg-gray-100"

        />
    <div className="w-px h-8 bg-gray-300"></div>

       
        <div className="flex items-center gap-3">

        
          <picture>
            <source srcSet="/profile.webp" type="image/webp" />
            <img
              src="/profile.png"
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
          </picture>

        
          <div className="flex flex-col leading-tight">
            <span className="font-semibold">Dolma Gurung</span>
            <span className="text-sm opacity-70">Manager</span>
          </div>

        </div>
      </div>
    </div>
  );
}
