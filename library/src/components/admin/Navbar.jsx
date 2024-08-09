import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/admin/login')  
  }
  return (
    <nav className="bg-gradient-to-r from-gray-900  to-white-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-white text-xl font-bold">Library Admin</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink to="/admin/add-book">Add Book</NavLink>
                <NavLink to="/admin/transactions">Library Transactions</NavLink>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <button
              onClick={handleLogout}
              className="text-white bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
            >
              Logout
            </button>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink to="/admin/add-book">Add Book</MobileNavLink>
            <MobileNavLink to="/admin/users">Users</MobileNavLink>
            <MobileNavLink to="/admin/transactions">Library Transactions</MobileNavLink>
            <button
              onClick={handleLogout}
              className="w-full text-left text-white bg-red-600 hover:bg-red-700 block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
  >
    {children}
  </Link>
)

const MobileNavLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-white hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
  >
    {children}
  </Link>
)

export default Navbar