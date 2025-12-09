function CustomerRow({ customer, onApprove, onReject }) {
  const { id, first_name, last_name, email, phone, status } = customer;
  const displayName = `${first_name} ${last_name}`.trim() || "N/A";

  return (
    <div className="flex items-center text-sm px-6 py-4 hover:bg-gray-50">
      <div className="flex-1 text-xs">{displayName}</div>
      <div className="flex-1 text-xs">{email}</div>
      <div className="flex-1 text-xs">{phone}</div>
      <div className="flex-1 flex gap-3">
        <button
          onClick={() => onApprove(id)}
          disabled={status === "approved"}
          className={`px-4 py-2 border rounded-xs  text-xs  ${
            status === "approved"
              ? "bg-green-100 text-green-600 border-green-600 "
              : "text-green-600 border-green-600 "
          }`}
        >
          {status === "approved" ? "Approved" : "Approved"}
        </button>
        <button
          onClick={() => onReject(id)}
          disabled={status === "rejected"}
          className={`px-5 py-2 border rounded-xs text-xs ${
            status === "rejected"
              ? "bg-red-100 text-red-600 border-red-600 cursor-not-allowed"
              : "text-red-600 border-red-600 hover:bg-red-50"
          }`}
        >
          {status === "rejected" ? "Rejected" : "Reject"}
        </button>
      </div>
    </div>
  );
}
export default CustomerRow;