export default function TransactionsTable({ data = [], onSort, sortField, sortOrder }) {
  const rows = Array.isArray(data) ? data : data?.data || [];

  const head = [
    { key: 'collect_id', label: 'Collect ID' },
    { key: 'school_id', label: 'School ID' },
    { key: 'gateway', label: 'Gateway' },
    { key: 'order_amount', label: 'Order Amount' },
    { key: 'transaction_amount', label: 'Transaction Amount' },
    { key: 'status', label: 'Status' },
    { key: 'custom_order_id', label: 'Custom Order ID' },
    { key: 'transaction_date', label: 'Date' } // ✅ Added Date Column
  ];

  const renderSort = (key) => {
    if (sortField !== key) return null;
    return sortOrder === 'asc' ? ' ▲' : ' ▼';
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <table className="min-w-full bg-white dark:bg-gray-800 text-sm">
        <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
          <tr>
            {head.map(h => (
              <th
                key={h.key}
                onClick={() => onSort(h.key)}
                className="text-left p-3 font-medium cursor-pointer select-none hover:text-blue-600 transition-colors sticky top-0"
              >
                {h.label}{renderSort(h.key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr
              key={row.collect_id || row._id || idx}
              className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-md"
            >
              <td className="p-3 border-t">{row.collect_id}</td>
              <td className="p-3 border-t">{row.school_id}</td>
              <td className="p-3 border-t">{row.gateway}</td>
              <td className="p-3 border-t">{row.order_amount}</td>
              <td className="p-3 border-t">{row.transaction_amount}</td>
              <td className="p-3 border-t">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium
                    ${row.status === 'success'
                      ? 'bg-green-100 text-green-700'
                      : row.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'}
                  `}
                >
                  {row.status}
                </span>
              </td>
              <td className="p-3 border-t">{row.custom_order_id}</td>
              <td className="p-3 border-t">
                {row.createdAt? new Date(row.createdAt).toLocaleDateString('en-IN'): '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
