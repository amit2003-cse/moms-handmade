const categories = [
    { name: "Sweets", emoji: "🍬" },
    { name: "Spicy", emoji: "🌶️" },
    { name: "Crunchy", emoji: "🥨" },
  ];
  
  const Categories = () => {
    return (
      <section className="py-10 px-6">
        <h2 className="text-2xl font-bold text-center mb-8">
          Featured Categories
        </h2>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="bg-orange-100 p-8 rounded-xl text-center hover:shadow-lg transition"
            >
              <div className="text-5xl mb-4">{cat.emoji}</div>
              <h3 className="text-xl font-semibold">{cat.name}</h3>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default Categories;
  