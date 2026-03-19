// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaLeaf, FaHeart, FaTruck, FaQuoteLeft, FaUsers, FaAward } from 'react-icons/fa';

const About = () => {
  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="bg-white text-gray-800 font-sans overflow-hidden">
      
      {/* 1. HERO SECTION WITH PARALLAX FEEL */}
      <div className="relative h-[60vh] flex items-center justify-center text-center text-white">
        <div 
            className="absolute inset-0 bg-cover bg-center fixed-bg"
            style={{ backgroundImage: 'url("https://img.freepik.com/free-photo/indian-woman-cooking-kitchen_23-2149669618.jpg?w=1200")' }} 
        >
            {/* Dark Overlay for Readability */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        </div>
        
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="relative z-10 px-6 max-w-3xl"
        >
            <span className="text-yellow-400 font-bold tracking-widest uppercase text-sm mb-4 block">Est. 2024</span>
            <h1 className="text-5xl md:text-7xl font-bold font-serif mb-6 leading-tight">
                Tradition wrapped in <br/> <span className="text-orange-500">Love</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 font-light">
                Ghar ka swaad, Maa ke haathon ka pyaar. <br/> Hum laate hain wo purani yaadein wapas, ek naye andaaz mein.
            </p>
        </motion.div>
      </div>

      {/* 2. THE STORY (ZIG-ZAG LAYOUT) */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
            
            {/* Image Composition */}
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
            >
                <div className="absolute top-4 -left-4 w-full h-full border-4 border-orange-200 rounded-2xl z-0"></div>
                <img 
                    src="https://img.freepik.com/free-photo/senior-woman-cooking-kitchen_23-2148825835.jpg?w=800" 
                    alt="Mom Cooking" 
                    className="relative z-10 rounded-2xl shadow-2xl w-full object-cover h-[400px] hover:scale-[1.02] transition-transform duration-500"
                />
                {/* Floating Badge */}
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl z-20 hidden md:block">
                    <p className="text-4xl font-bold text-orange-600">100%</p>
                    <p className="text-sm text-gray-500 font-semibold uppercase">Preservative Free</p>
                </div>
            </motion.div>

            {/* Text Content */}
            <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-4xl font-bold mb-6 text-gray-900 font-serif">Kyun shuru kiya humne?</h2>
                <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                    <p>
                        Shuruaat hui ek simple se khayal se: <span className="text-orange-600 font-semibold italic">"Kyun na sabko wahi shuddh aur swadisht snacks khilayein jo hum apne ghar par khate hain?"</span>
                    </p>
                    <p>
                        Aaj kal bazaar mein milne wale snacks preservatives aur palm oil se bhare hote hain. Hum chahte thay ki har koi wo <strong>asli Desi Ghee</strong> ki khushboo aur masalon ka jaadu mehsoos kare.
                    </p>
                    <p>
                        Ye sirf business nahi hai, ye ek koshish hai Maa ke haath ke swaad ko har ghar tak pahunchane ki.
                    </p>
                </div>
                
                <div className="mt-8 border-l-4 border-orange-500 pl-4 italic text-gray-500">
                    "Khana sirf pet bharne ke liye nahi, dil bharne ke liye hona chahiye."
                </div>
            </motion.div>
        </div>
      </div>

      {/* 3. CORE VALUES (Cards with Hover Effect) */}
      <div className="bg-orange-50 py-20 relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
            <FaLeaf size={300} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold font-serif mb-4">Our Promise to You 🤝</h2>
                <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
            </div>

            <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid md:grid-cols-3 gap-8"
            >
                {/* Card 1 */}
                <FeatureCard 
                    icon={<FaLeaf />} 
                    title="100% Natural Ingredients" 
                    desc="Koi chemical nahi, koi milawat nahi. Sirf wo jo kitchen mein milta hai."
                    color="text-green-600"
                    bg="bg-green-100"
                />
                
                {/* Card 2 */}
                <FeatureCard 
                    icon={<FaHeart />} 
                    title="Made with Pure Love" 
                    desc="Har batch haathon se banaya jata hai, machines se nahi. Small batches, fresh taste."
                    color="text-red-600"
                    bg="bg-red-100"
                />

                {/* Card 3 */}
                <FeatureCard 
                    icon={<FaTruck />} 
                    title="Fresh from Kitchen" 
                    desc="Stock karke nahi rakhte. Order aane par pack hota hai aur seedha aap tak."
                    color="text-blue-600"
                    bg="bg-blue-100"
                />
            </motion.div>
        </div>
      </div>

      {/* 4. STATS STRIP (Social Proof) */}
      <div className="bg-orange-600 text-white py-12">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatBox number="5,000+" label="Happy Jars Sold" icon={<FaAward />} />
            <StatBox number="1,200+" label="Loyal Customers" icon={<FaUsers />} />
            <StatBox number="15+" label="Secret Recipes" icon={<FaLeaf />} />
            <StatBox number="4.9/5" label="Average Rating" icon={<FaHeart />} />
        </div>
      </div>

      {/* 5. FOUNDER'S QUOTE */}
      <div className="container mx-auto px-6 py-20 text-center">
        <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-gray-100 p-10 rounded-3xl shadow-xl max-w-4xl mx-auto relative"
        >
            <FaQuoteLeft className="text-4xl text-orange-200 absolute top-6 left-6" />
            <p className="text-2xl font-serif text-gray-800 italic leading-relaxed z-10 relative">
                "Humara maksad paise kamana nahi, balki har uss insaan ko ghar ki yaad dilana hai jo apne parivaar se door baitha hai. Ek bite khakar agar aapke chehre par muskan aa gayi, toh humari mehnat safal."
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
                <img src="https://i.pravatar.cc/150?img=5" alt="Founder" className="w-16 h-16 rounded-full border-2 border-orange-500" />
                <div className="text-left">
                    <p className="font-bold text-lg text-gray-900">Sunita Sharma</p>
                    <p className="text-sm text-orange-600 font-medium">Founder & Head Chef</p>
                </div>
            </div>
        </motion.div>
      </div>

    </div>
  );
};

// --- Helper Components for Clean Code ---

const FeatureCard = ({ icon, title, desc, color, bg }) => (
    <motion.div 
        variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
        className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group"
    >
        <div className={`w-16 h-16 ${bg} ${color} rounded-full flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform`}>
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
        <p className="text-gray-500 leading-relaxed">{desc}</p>
    </motion.div>
);

const StatBox = ({ number, label, icon }) => (
    <div className="flex flex-col items-center">
        <div className="text-orange-200 text-3xl mb-2 opacity-80">{icon}</div>
        <p className="text-4xl font-bold mb-1">{number}</p>
        <p className="text-orange-100 text-sm uppercase tracking-wider">{label}</p>
    </div>
);

export default About;