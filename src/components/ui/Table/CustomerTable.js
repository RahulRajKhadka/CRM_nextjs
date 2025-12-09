export default function Table({ children }) {
  return (
    <div className="bg-white p-4">
      <div className="flex flex-col">
        {children}
      </div>
    </div>
  );
}

