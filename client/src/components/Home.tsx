import React from "react";

const Home: React.FC = () => {
  return (
    <div className="w-full">
  
      <section className="bg-linear-to-r from-orange-500 to-red-500 text-white">
        <div className="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              Delicious Food <br /> Delivered To Your Door
            </h1>
            <p className="text-lg mb-8 opacity-90">
              Fresh, hygienic & tasty meals delivered fast. Your hunger ends
              here.
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

          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
              alt="Food"
              className="rounded-xl shadow-lg w-full max-w-md"
            />
          </div>
        </div>
      </section>

    
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            {
              title: "Fast Delivery",
              desc: "Get your food delivered in under 30 minutes.",
            },
            {
              title: "Fresh Ingredients",
              desc: "We use only fresh & high-quality ingredients.",
            },
            {
              title: "Best Chefs",
              desc: "Prepared by experienced & professional chefs.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold mb-3 text-orange-500">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* POPULAR CATEGORIES */}
      <section className=" py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Popular Categories
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "Pizza", img: "🍕" },
              { name: "Burgers", img: "🍔" },
              { name: "Desserts", img: "🍰" },
              { name: "Drinks", img: "🥤" },
            ].map((item) => (
              <div
                key={item.name}
                className="bg-white rounded-xl shadow-md p-6 text-center hover:scale-105 transition text-gray-900"
              >
                <div className="text-5xl mb-4">{item.img}</div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR DISHES */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Popular Dishes</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { name: "Cheese Pizza", price: "₹299" },
            { name: "Chicken Burger", price: "₹199" },
            { name: "Chocolate Cake", price: "₹149" },
          ].map((food) => (
            <div
              key={food.name}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition text-gray-900"
            >
              <h3 className="text-xl font-semibold mb-2">{food.name}</h3>
              <p className="text-orange-500 font-bold mb-4">{food.price}</p>
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-orange-500 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">What Our Customers Say</h2>

          <div className="max-w-2xl mx-auto">
            <p className="italic text-lg mb-4">
              "Amazing food quality and super fast delivery. Highly
              recommended!"
            </p>
            <h4 className="font-semibold">— Happy Customer</h4>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Order Your Favorite Food?
        </h2>
        <p className="text-gray-600 mb-8">
          Download our app or order directly from the website.
        </p>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-3 rounded-lg font-semibold">
          Get Started
        </button>
      </section>
    </div>
  );
};

export default Home;
