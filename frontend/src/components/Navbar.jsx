import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useLocalStorage from '../utils/useLocalStorage'

export default function Navbar() {
  const navigate = useNavigate()
  const [dark, setDark] = useLocalStorage('edv_dark', false)

  React.useEffect(() => {
    if (dark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [dark])

  const logout = () => {
    localStorage.removeItem('edv_token')
    navigate('/login')
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link to="/" className="text-xl font-semibold">EDVIRON</Link>
        <Link to="/" className="text-sm">Transactions</Link>
        <Link to="/by-school" className="text-sm">By School</Link>
        <Link to="/check-status" className="text-sm">Check Status</Link>
        <Link to="/create-payment" className="text-sm">Create Payment</Link>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setDark(!dark)}
          className="px-3 py-1 border rounded"
        >
          {dark ? 'Light' : 'Dark'}
        </button>
        <button onClick={logout} className="px-3 py-1 bg-red-500 text-white rounded">Logout</button>
      </div>
    </nav>
  )
}
