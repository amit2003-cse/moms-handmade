import { useState, useEffect, useRef } from 'react';
import { FaComments, FaTimes, FaShippingFast, FaCreditCard, FaShieldAlt, FaHeadset, FaWhatsapp, FaEnvelope, FaChevronLeft } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null); // 'delivery', 'payment', etc.
  const chatRef = useRef(null);

  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // FAQ Data
  const faqData = {
    delivery: {
      title: "Delivery Queries 🚚",
      questions: [
        { q: "How long does delivery take?", a: "Usually 3-5 business days." },
        { q: "Do you ship internationally?", a: "Currently, we only ship within India." },
        { q: "How can I track my order?", a: "Go to 'My Orders' section to track." },
      ]
    },
    payment: {
      title: "Payment Methods 💳",
      questions: [
        { q: "Is COD available?", a: "Yes, Cash on Delivery is available for most locations." },
        { q: "Is online payment safe?", a: "Absolutely! We use secure gateways like Razorpay." },
      ]
    },
    warranty: {
      title: "Warranty & Returns 🛡️",
      questions: [
        { q: "Can I return the product?", a: "Yes, within 7 days if damaged/wrong item." },
        { q: "Is there a warranty?", a: "Since these are food items, warranty doesn't apply, but freshness is guaranteed!" },
      ]
    }
  };

  const renderContent = () => {
    // 1. Agar koi category select nahi hai (Main Menu)
    if (!activeCategory) {
      return (
        <div className="space-y-3">
          <p className="text-gray-600 mb-4 text-sm">Hi! 👋 How can we help you today?</p>
          
          <button onClick={() => setActiveCategory('delivery')} className="w-full flex items-center gap-3 p-3 bg-orange-50 hover:bg-orange-100 rounded-xl text-left text-gray-700 transition font-medium text-sm">
            <FaShippingFast className="text-orange-500" /> Delivery
          </button>
          
          <button onClick={() => setActiveCategory('payment')} className="w-full flex items-center gap-3 p-3 bg-orange-50 hover:bg-orange-100 rounded-xl text-left text-gray-700 transition font-medium text-sm">
            <FaCreditCard className="text-orange-500" /> Payment
          </button>
          
          <button onClick={() => setActiveCategory('warranty')} className="w-full flex items-center gap-3 p-3 bg-orange-50 hover:bg-orange-100 rounded-xl text-left text-gray-700 transition font-medium text-sm">
            <FaShieldAlt className="text-orange-500" /> Warranty / Returns
          </button>
          
          <button onClick={() => setActiveCategory('support')} className="w-full flex items-center gap-3 p-3 bg-orange-50 hover:bg-orange-100 rounded-xl text-left text-gray-700 transition font-medium text-sm">
            <FaHeadset className="text-orange-500" /> Talk to Support
          </button>
        </div>
      );
    }

    // 2. Agar 'Talk to Support' select kiya
    if (activeCategory === 'support') {
      return (
        <div>
          <button onClick={() => setActiveCategory(null)} className="mb-4 text-xs flex items-center gap-1 text-gray-500 hover:text-orange-600">
            <FaChevronLeft /> Back to Menu
          </button>
          <h3 className="font-bold text-gray-800 mb-2">Contact Support 🎧</h3>
          <p className="text-sm text-gray-600 mb-4">Still need help? Reach out to us directly.</p>
          
          <div className="space-y-3">
            <a href="https://wa.me/919110904529" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 rounded-xl text-green-700 font-bold transition">
              <FaWhatsapp className="text-xl" /> Chat on WhatsApp
            </a>
            <a href="mailto:amit4321sg@gmail.com" className="flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-xl text-blue-700 font-bold transition">
              <FaEnvelope className="text-xl" /> Email Support
            </a>
          </div>
        </div>
      );
    }

    // 3. Agar Delivery/Payment/Warranty select kiya (FAQs)
    const categoryData = faqData[activeCategory];
    return (
      <div className="h-64 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-orange-200">
        <button onClick={() => setActiveCategory(null)} className="mb-3 text-xs flex items-center gap-1 text-gray-500 hover:text-orange-600 sticky top-0 bg-white z-10 py-1">
          <FaChevronLeft /> Back to Menu
        </button>
        <h3 className="font-bold text-gray-800 mb-3">{categoryData.title}</h3>
        
        <div className="space-y-3">
          {categoryData.questions.map((item, idx) => (
            <div key={idx} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
              <p className="font-bold text-xs text-orange-600 mb-1">{item.q}</p>
              <p className="text-sm text-gray-700">{item.a}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-3 border-t text-center">
          <p className="text-xs text-gray-500 mb-2">Didn't find what you need?</p>
          <button onClick={() => setActiveCategory('support')} className="text-xs font-bold text-orange-600 underline">
            Contact Support
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end" ref={chatRef}>
      
      {/* Chat Window (AnimatePresence for smooth open/close) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-600 to-orange-500 p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <div className="bg-white/20 p-1.5 rounded-full">
                  <FaHeadset />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Mom's Assistant</h3>
                  <p className="text-[10px] text-orange-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span> Online
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition">
                <FaTimes />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 bg-white min-h-[300px]">
              {renderContent()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-orange-600 text-white p-4 rounded-full shadow-lg shadow-orange-500/40 hover:bg-orange-700 transition flex items-center justify-center relative"
      >
        {isOpen ? <FaTimes size={24} /> : <FaComments size={24} />}
        
        {/* Notification Badge (Optional eye-catcher) */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        )}
      </motion.button>

    </div>
  );
};

export default Chatbot;