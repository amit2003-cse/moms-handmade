const Hero = () => {
    return (
      <section
        className="h-[70vh] bg-cover bg-center flex items-center justify-center text-center px-4"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1604909052743-94e838986d24)",
        }}
      >
        <div className="bg-black/50 p-6 rounded-lg text-white max-w-xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Ghar Ka Swad, Ab Online
          </h1>
          <p className="mb-6">
            Fresh homemade sweets & snacks – bilkul maa ke haathon jaise ❤️
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-full font-semibold">
            Order Ghar Ka Swad Now
          </button>
        </div>
      </section>
    );
  };
  
  export default Hero;
  