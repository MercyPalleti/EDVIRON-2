import React from 'react'
import api from '../api/axios'
import Navbar from '../components/Navbar'
import TransactionsTable from '../components/TransactionsTable'
import FiltersPanel from '../components/FiltersPanel'
import Pagination from '../components/Pagination'
import { parseQS, buildQS } from '../utils/qsHelpers'
import { useSearchParams, useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const initialFilters = parseQS(window.location.search)

  const [transactions, setTransactions] = React.useState([])
  const [total, setTotal] = React.useState(0)
  const [page, setPage] = React.useState(Number(initialFilters.page) || 1)
  const [pageSize, setPageSize] = React.useState(Number(initialFilters.limit) || 10)
  const [sortField, setSortField] = React.useState(initialFilters.sort || 'payment_time')
  const [sortOrder, setSortOrder] = React.useState(initialFilters.order || 'desc')
  const [search, setSearch] = React.useState(initialFilters.q || '')

  // ✅ status is a string (not array)
  const [statusFilter, setStatusFilter] = React.useState(initialFilters.status || '')

  const [schoolFilter, setSchoolFilter] = React.useState(
    initialFilters.school
      ? (Array.isArray(initialFilters.school) ? initialFilters.school : [initialFilters.school])
      : []
  )
  const [dateFrom, setDateFrom] = React.useState(initialFilters.from || '')
  const [dateTo, setDateTo] = React.useState(initialFilters.to || '')
  const [loading, setLoading] = React.useState(false)
  const [schoolList, setSchoolList] = React.useState([])

  // ✅ fetchData handles transactions + building school list
  const fetchData = React.useCallback(async () => {
    setLoading(true)
    try {
      const params = {
        page,
        limit: pageSize,
        sort: sortField,
        order: sortOrder,
        q: search,
        status: statusFilter || undefined,  // ✅ string
        school_id: schoolFilter.join(','),
        from: dateFrom,
        to: dateTo,
      }
      const res = await api.get('/transactions', { params })
      setTransactions(res.data.data || res.data || [])
      setTotal(res.data.total || (res.data.data ? res.data.data.length : 0))

      // build school list if empty
      if (!schoolList.length && res.data.data) {
        const s = Array.from(new Set(res.data.data.map(d => d.school_id))).slice(0, 50)
        setSchoolList(s)
      }
    } catch (err) {
      console.error(err)
      alert('Failed to fetch transactions')
    } finally {
      setLoading(false)
    }
  }, [
    page,
    pageSize,
    sortField,
    sortOrder,
    search,
    statusFilter,
    schoolFilter,
    dateFrom,
    dateTo,
    schoolList.length,
  ])

  // ✅ Single effect for initial + updates
  React.useEffect(() => {
    updateUrl()
    fetchData()
  }, [page, pageSize, sortField, sortOrder, search, statusFilter, schoolFilter, dateFrom, dateTo, fetchData])

  function updateUrl() {
    const qsObj = {
      page,
      limit: pageSize,
      sort: sortField,
      order: sortOrder,
      q: search || undefined,
      status: statusFilter || undefined, // ✅ string
      school: Array.isArray(schoolFilter) && schoolFilter.length ? schoolFilter : undefined,
      from: dateFrom || undefined,
      to: dateTo || undefined,
    }
    const qs = buildQS(qsObj)
    navigate({ pathname: '/', search: qs }, { replace: true })
  }

  function handleSort(field) {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  return (
    <>
      <Navbar />
      <div className="p-4 md:p-6">
        <h1 className="text-2xl mb-3">Transactions Overview</h1>

        {/* Filters */}
        <div className="mb-3">
          <FiltersPanel
            search={search}
            onSearchChange={setSearch}
            statusOptions={['success', 'pending', 'failed']}
            selectedStatus={statusFilter}
            onStatusChange={setStatusFilter}
            schoolList={schoolList}
            selectedSchools={schoolFilter}
            onSchoolsChange={(val) => setSchoolFilter(Array.isArray(val) ? val : [val])}
            dateFrom={dateFrom}
            dateTo={dateTo}
            onDateChange={(k, v) => (k === 'from' ? setDateFrom(v) : setDateTo(v))}
          />
        </div>

        {/* Page size selector */}
        <div className="mb-3 flex items-center">
          <label className="text-sm mr-2">Page size:</label>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="border p-1 rounded"
          >
            {[10, 25, 50, 100].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        {/* Transactions table */}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <TransactionsTable
              data={transactions}
              onSort={handleSort}
              sortField={sortField}
              sortOrder={sortOrder}
            />
            <div className="mt-3 flex items-center justify-between">
              <Pagination page={page} pageSize={pageSize} total={total} onChange={(p) => setPage(p)} />
              <div>Total: {total}</div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
