import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className="relative h-[500px] bg-cover bg-center" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1578895101408-1a36b834405b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")'}}>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Welcome to Habibi Stay</h1>
          <p className="text-xl mb-8">Experience authentic Saudi hospitality with our unique short-term rentals</p>
        </div>
      </div>
    </div>
  )
}

export default Hero