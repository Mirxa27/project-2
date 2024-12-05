import React from 'react'

const Contact = () => {
  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold mb-8 text-purple-900">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="mb-4">We'd love to hear from you. Whether you have a question about our services, need help with a booking, or want to partner with us, our team is ready to assist you.</p>
          <ul className="space-y-2">
            <li><strong>Email:</strong> info@habibistay.com</li>
            <li><strong>Phone:</strong> +966-55-0800-669</li>
            <li><strong>Address:</strong> Riyadh, Saudi Arabia</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1">Name</label>
              <input type="text" id="name" name="name" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1">Email</label>
              <input type="email" id="email" name="email" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label htmlFor="message" className="block mb-1">Message</label>
              <textarea id="message" name="message" rows={4} className="w-full p-2 border rounded"></textarea>
            </div>
            <button type="submit" className="bg-purple-900 text-white px-4 py-2 rounded hover:bg-purple-800">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact