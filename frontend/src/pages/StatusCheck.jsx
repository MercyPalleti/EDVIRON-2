import React from 'react'
import api from '../api/axios'
import Navbar from '../components/Navbar'

export default function StatusCheck() {
  const [customId, setCustomId] = React.useState('')
  const [result, setResult] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  async function check() {
    if (!customId) return alert('Enter custom_order_id')
    setLoading(true)
    try {
      const res = await api.get(`/transaction-status/${encodeURIComponent(customId)}`)
      setResult(res.data)
    } catch (err) {
      setResult(null)
      alert(err.response?.data?.message || 'Failed to fetch status')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl mb-4">Check Transaction Status</h1>
        <div className="flex gap-3 items-center mb-4">
          <input className="border p-2 rounded" placeholder="custom_order_id" value={customId} onChange={e=>setCustomId(e.target.value)} />
          <button className="px-3 py-2 bg-blue-600 text-white rounded" onClick={check}>Check</button>
        </div>

        {loading && <div>Loading...</div>}
        {result && (
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <pre className="whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </>
  )
}
