import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Menu, X } from 'lucide-react'
import { isAuthenticated, logout, getCurrentUser } from '../services/authService'
import Logo from './Logo'

const Header = () => {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();
  const currentUser = getCurrentUser();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex-shrink-0">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-primary-600 transition-colors">About</Link>
            <Link to="/properties" className="text-gray-700 hover:text-primary-600 transition-colors">Properties</Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary-600 transition-colors">Contact</Link>
            {authenticated && currentUser?.userType === 'host' && (
              <Link to="/host-dashboard" className="text-gray-700 hover:text-primary-600 transition-colors">Host Dashboard</Link>
            )}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {authenticated ? (
              <>
                <Link to="/profile" className="text-gray-700 hover:text-primary-600 transition-colors">
                  <User className="w-5 h-5" />
                </Link>
                <button 
                  onClick={handleLogout}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors">Home</Link>
              <Link to="/about" className="text-gray-700 hover:text-primary-600 transition-colors">About</Link>
              <Link to="/properties" className="text-gray-700 hover:text-primary-600 transition-colors">Properties</Link>
              <Link to="/contact" className="text-gray-700 hover:text-primary-600 transition-colors">Contact</Link>
              {authenticated && currentUser?.userType === 'host' && (
                <Link to="/host-dashboard" className="text-gray-700 hover:text-primary-600 transition-colors">Host Dashboard</Link>
              )}
              {authenticated ? (
                <>
                  <Link to="/profile" className="text-gray-700 hover:text-primary-600 transition-colors">Profile</Link>
                  <button 
                    onClick={handleLogout}
                    className="text-left text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-primary-600 transition-colors">Login</Link>
                  <Link to="/register" className="text-gray-700 hover:text-primary-600 transition-colors">Register</Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header