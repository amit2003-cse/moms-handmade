import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Yahan future mein backend API call lag sakti hai
    toast.success("Message sent! We will contact you soon.");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Get in Touch 📞</h1>

      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        
        {/* Contact Info */}
        <div className="bg-orange-600 text-white p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-xl" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-xl" />
              <span>support@momshandmade.com</span>
            </div>
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-xl" />
              <span>Model Town, Ludhiana, Punjab, India</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input 
                type="text" 
                required 
                className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-orange-500 outline-none"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input 
                type="email" 
                required 
                className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-orange-500 outline-none"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea 
                rows="4" 
                required 
                className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-orange-500 outline-none"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>
            <button type="submit" className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-800 transition">
              Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;