import React from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate()

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await api.post('/auth/login', { email, password })
      const token = res.data.token || res.data.accessToken || res.data.jwt
      if (!token) throw new Error('No token returned from server')
      localStorage.setItem('edv_token', token)
      navigate('/')
    } catch (err) {
      alert(err.response?.data?.message || err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="block text-sm">Email</label>
          <input className="w-full border p-2 rounded" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input className="w-full border p-2 rounded" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        <button disabled={loading} className="w-full py-2 bg-blue-600 text-white rounded">{loading ? 'Logging...' : 'Login'}</button>
      </form>
      <p className="text-xs mt-3 text-gray-500">Use your backend credentials to log in.</p>
    </div>
  )
}
