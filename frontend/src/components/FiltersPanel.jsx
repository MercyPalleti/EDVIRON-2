export default function FiltersPanel({
  search,
  onSearchChange,
  statusOptions = ['success', 'pending', 'failed'],
  selectedStatus = '',
  onStatusChange,
  selectedSchools = [],
  onSchoolsChange,
  dateFrom,
  dateTo,
  onDateChange
}) {
  return (
    <div 
      className="flex flex-wrap gap-3 p-3 bg-gray-50 dark:bg-gray-900 
                 rounded-md shadow-sm justify-start"
    >
      {/* Search 
      <div className="flex flex-col w-[180px]">
        <label className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">
          Search
        </label>
        <input
          type="text"
          placeholder="Collect ID / Order ID"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="px-2 py-1.5 border border-gray-300 dark:border-gray-700 rounded 
                     bg-white dark:bg-gray-800 shadow-sm focus:ring-2 focus:ring-blue-500 
                     focus:border-blue-500 outline-none"
        />
      </div>
      */}

      {/* Status (single select) */}
      <div className="flex flex-col w-[130px]">
        <label className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">
          Status
        </label>
        <select
          value={selectedStatus || ''}
          onChange={(e) => onStatusChange(e.target.value)}
          className="px-2 py-1.5 border border-gray-300 dark:border-gray-700 rounded 
                     bg-white dark:bg-gray-800 shadow-sm focus:ring-2 focus:ring-blue-500 
                     focus:border-blue-500 outline-none"
        >
          <option value="">All</option>
          {statusOptions.map(s => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* School ID (manual input) */}
      <div className="flex flex-col w-[180px]">
        <label className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">
          School ID
        </label>
        <input
          type="text"
          placeholder="Enter School ID(s)"
          value={selectedSchools.join(', ')}
          onChange={(e) => {
            const ids = e.target.value
              .split(',')
              .map(s => s.trim())
              .filter(Boolean)
            onSchoolsChange(ids)
          }}
          className="px-2 py-1.5 border border-gray-300 dark:border-gray-700 rounded 
                     bg-white dark:bg-gray-800 shadow-sm focus:ring-2 focus:ring-blue-500 
                     focus:border-blue-500 outline-none"
        />
      </div>

      {/* Date From */}
      <div className="flex flex-col w-[120px]">
        <label className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">
          From
        </label>
        <input
          type="date"
          value={dateFrom || ''}
          onChange={(e) => onDateChange('from', e.target.value)}
          className="px-2 py-1.5 border border-gray-300 dark:border-gray-700 rounded 
                     bg-white dark:bg-gray-800 shadow-sm focus:ring-2 focus:ring-blue-500 
                     focus:border-blue-500 outline-none"
        />
      </div>

      {/* Date To */}
      <div className="flex flex-col w-[120px]">
        <label className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">
          To
        </label>
        <input
          type="date"
          value={dateTo || ''}
          onChange={(e) => onDateChange('to', e.target.value)}
          className="px-2 py-1.5 border border-gray-300 dark:border-gray-700 rounded 
                     bg-white dark:bg-gray-800 shadow-sm focus:ring-2 focus:ring-blue-500 
                     focus:border-blue-500 outline-none"
        />
      </div>
    </div>
  )
}
