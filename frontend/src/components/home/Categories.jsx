import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const categories = [
  { id: 1, title: "Desi Sweets", emoji: "🍬", desc: "Besan Ladoo, Pinni & more", color: "bg-yellow-50", link: "/products?category=Sweets" },
  { id: 2, title: "Spicy Pickles", emoji: "🌶️", desc: "Aam, Nimbu & Mirchi Achaar", color: "bg-red-50", link: "/products?category=Spicy" },
  { id: 3, title: "Crunchy Namkeen", emoji: "🥨", desc: "Mathri, Sev & Chatpata Snacks", color: "bg-orange-50", link: "/products?category=Crunchy" },
];

const Categories = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif mb-3">Explore Our Menu 🍴</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Har mood ke liye kuch khaas. Meetha, Teekha ya Namkeen?</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <div className={`h-40 ${cat.color} flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-500`}>
                {cat.emoji}
              </div>
              <div className="p-8 text-center relative z-10">
                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">{cat.title}</h3>
                <p className="text-gray-500 mb-6">{cat.desc}</p>
                <Link to={cat.link} className="inline-block border-b-2 border-orange-500 text-orange-600 font-bold pb-1 hover:text-orange-800 transition">
                  Shop Now &rarr;
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;