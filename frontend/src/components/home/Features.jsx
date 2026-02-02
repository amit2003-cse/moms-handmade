import { FaShippingFast, FaLeaf, FaHeart, FaShieldAlt } from 'react-icons/fa';

const features = [
  { icon: <FaLeaf />, title: "100% Natural", desc: "No chemicals, just pure ingredients." },
  { icon: <FaHeart />, title: "Made with Love", desc: "Handmade in small batches." },
  { icon: <FaShieldAlt />, title: "Hygiene First", desc: "Packed with extreme care & safety." },
  { icon: <FaShippingFast />, title: "Fast Delivery", desc: "Freshness delivered to your doorstep." },
];

const Features = () => {
  return (
    <div className="py-12 bg-white border-b border-gray-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              <div className="bg-orange-50 text-orange-600 p-4 rounded-full text-3xl mb-4 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300 shadow-md">
                {feature.icon}
              </div>
              <h3 className="font-bold text-gray-800 text-lg">{feature.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;