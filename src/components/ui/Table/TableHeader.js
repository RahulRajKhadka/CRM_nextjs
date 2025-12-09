export default function TableHeader({ headers }) {
  return (
    <div className="flex border-gray-100  py-6 px-6 border-t border-b  text-gray-500 text-sm bg-white ">
      {headers.map((header, index) => (
        <div key={index} className="flex-1">
          {header}
        </div>
      ))}
    </div>
  );
}
