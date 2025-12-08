export default function CustomerRow({ customer }) {
  const { first_name, last_name, email, phone, status } = customer;

  return (
    <div className="flex items-center p-3 hover:bg-gray-50">
      <div className="flex-1">{first_name} {last_name}</div>
      <div className="flex-1">{email}</div>
      <div className="flex-1">{phone}</div>
      <div className="flex-1 flex gap-2">
        <button
          className="px-3 py-1 text-green-600 border border-green-600 rounded"
          disabled={status === "approved"}
        >
          Approve
        </button>
        <button
          className="px-3 py-1 text-red-600 border border-red-600 rounded"
          disabled={status === "rejected"}
        >
          Reject
        </button>
      </div>
    </div>
  );
}
