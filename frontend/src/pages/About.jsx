import { FaLeaf, FaHeart, FaTruck } from 'react-icons/fa';

const About = () => {
  return (
    <div className="bg-white text-gray-800">
      
      {/* Hero Section */}
      <div className="bg-orange-50 py-16 text-center">
        <h1 className="text-4xl font-bold text-orange-600 mb-4">About Mom's Handmade 🍪</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto px-4">
          Ghar ka swaad, Maa ke haathon ka pyaar. Hum laate hain aapke liye 100% natural aur fresh snacks.
        </p>
      </div>

      {/* Story Section */}
      <div className="container mx-auto px-4 py-12 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <img 
            src="https://placehold.co/600x400?text=Making+Snacks" 
            alt="Cooking" 
            className="rounded-lg shadow-lg w-full"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Story</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Shuruaat hui ek simple se khayal se: "Kyun na sabko wahi shuddh aur swadisht snacks khilayein jo hum apne ghar par khate hain?"
          </p>
          <p className="text-gray-600 leading-relaxed">
            Aaj kal bazaar mein milne wale snacks preservatives se bhare hote hain. 
            Isliye **Mom's Handmade** ka mission hai aap tak **Fresh, Crunchy, aur Healthy** snacks pahunchana, jo bilkul waise bane hon jaise Maa banati hai.
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
          
          <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
            <FaLeaf className="text-4xl text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">100% Natural</h3>
            <p className="text-gray-500 text-sm">Koi artificial colors ya preservatives nahi. Sirf shuddh ingredients.</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
            <FaHeart className="text-4xl text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Made with Love</h3>
            <p className="text-gray-500 text-sm">Har batch haathon se banaya jata hai, poori safai aur dhyan ke saath.</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
            <FaTruck className="text-4xl text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
            <p className="text-gray-500 text-sm">Fresh snacks seedha kitchen se aapke darwaze tak.</p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default About;