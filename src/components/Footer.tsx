import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-purple-900 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">About</h3>
          <ul>
            <li className="mb-2"><Link to="/about" className="hover:underline">Who We Are</Link></li>
            <li className="mb-2"><Link to="/about" className="hover:underline">Our Mission</Link></li>
            <li className="mb-2"><Link to="/about" className="hover:underline">Our Vision</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Services</h3>
          <ul>
            <li className="mb-2"><Link to="/properties" className="hover:underline">For Travelers</Link></li>
            <li className="mb-2"><Link to="/about" className="hover:underline">For Property Owners</Link></li>
            <li className="mb-2"><Link to="/about" className="hover:underline">For Investors</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul>
            <li className="mb-2"><Link to="/contact" className="hover:underline">Contact Us</Link></li>
            <li className="mb-2"><a href="#" className="hover:underline">FAQs</a></li>
            <li className="mb-2"><a href="#" className="hover:underline">Terms of Service</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect</h3>
          <ul>
            <li className="mb-2"><a href="#" className="hover:underline">Facebook</a></li>
            <li className="mb-2"><a href="#" className="hover:underline">Instagram</a></li>
            <li className="mb-2"><a href="#" className="hover:underline">Twitter</a></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto mt-8 pt-8 border-t border-purple-800 text-center">
        <p>&copy; 2023 Habibi Stay, Inc. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer