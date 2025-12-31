import React from "react";

const Home: React.FC = () => {
  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="bg-gradient-to from-orange-500 to-red-500 text-white">
        <div className="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-10">
          
          {/* LEFT CONTENT */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              Delicious Food <br /> Delivered To Your Door
            </h1>
            <p className="text-lg mb-8 opacity-90">
              Fresh, tasty meals made with love. Order your favorite food anytime,
              anywhere.
            </p>

            <div className="flex justify-center md:justify-start gap-4">
              <button className="bg-white text-orange-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition">
                Order Now
              </button>
              <button className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-orange-600 transition">
                View Menu
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
              alt="Delicious Food"
              className="rounded-xl shadow-lg w-full max-w-md"
            />
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Popular Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-gray-500">
          {[
            { name: "Pizza", img: "🍕" },
            { name: "Burgers", img: "🍔" },
            { name: "Desserts", img: "🍰" },
            { name: "Drinks", img: "🥤" },
          ].map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition cursor-pointer"
            >
              <div className="text-5xl mb-4">{item.img}</div>
              <h3 className="text-xl font-semibold">{item.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-600">
            Hungry? Let’s Fix That!
          </h2>
          <p className="text-gray-600 mb-8">
            Explore our menu and order your favorite meals in just a few clicks.
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition">
            Explore Foods
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
