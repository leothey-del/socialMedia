import React from 'react'

const Contact = () => {
  return (
    <section id="contact" className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Contact Me</h2>
      <form className="max-w-xl mx-auto flex flex-col gap-4">
        <input type="text" placeholder="Your Name" className="border p-3 rounded-md" />
        <input type="email" placeholder="Your Email" className="border p-3 rounded-md" />
        <textarea placeholder="Your Message" className="border p-3 rounded-md h-32" />
        <button type="submit" className="bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition">
          Send Message
        </button>
      </form>
    </section>
  )
}

export default Contact