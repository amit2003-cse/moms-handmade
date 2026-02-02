const testimonials = [
    {
      name: "Riya",
      text: "Bilkul ghar jaisa taste! Ladoo toh next level 😍",
    },
    {
      name: "Aman",
      text: "Fresh snacks aur fast delivery. Highly recommended!",
    },
  ];
  
  const Testimonials = () => {
    return (
      <section className="bg-gray-50 py-10 px-6">
        <h2 className="text-2xl font-bold text-center mb-8">
          What Our Customers Say ❤️
        </h2>
  
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-lg shadow text-center"
            >
              <p className="mb-4">“{t.text}”</p>
              <h4 className="font-semibold">– {t.name}</h4>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default Testimonials;
  