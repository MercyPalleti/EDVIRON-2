import React from 'react'
import api from '../api/axios'
import Navbar from '../components/Navbar'
import TransactionsTable from '../components/TransactionsTable'
import { useState } from 'react'

export default function SchoolTransactions() {
  const [schoolId, setSchoolId] = React.useState('')
  const [transactions, setTransactions] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  async function fetchForSchool() {
    if (!schoolId) return alert('Enter school id')
    setLoading(true)
    try {
      const res = await api.get(`/transactions/school/${schoolId}`)
      setTransactions(res.data || res.data.data || [])
    } catch (err) {
      console.error(err)
      alert('Failed to fetch for school')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl mb-4">Transactions by School</h1>
        <div className="mb-4 flex gap-3 items-center">
          <input value={schoolId} onChange={e=>setSchoolId(e.target.value)} placeholder="Enter school_id" className="border p-2 rounded" />
          <button onClick={fetchForSchool} className="px-3 py-2 bg-blue-600 text-white rounded">Fetch</button>
        </div>

        {loading ? <div>Loading...</div> : <TransactionsTable data={transactions} onSort={()=>{}} />}
      </div>
    </>
  )
}
