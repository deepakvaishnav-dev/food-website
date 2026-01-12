import { motion } from "framer-motion";
import { ChefHat, Leaf, Heart, Truck } from "lucide-react";

const features = [
  {
    icon: ChefHat,
    title: "Expert Chefs",
    desc: "Our experienced chefs cook every meal with passion, hygiene, and love."
  },
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    desc: "We use farm-fresh vegetables and high-quality ingredients every day."
  },
  {
    icon: Heart,
    title: "Made With Love",
    desc: "Every dish is prepared as if it were for our own family."
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Hot and delicious food delivered quickly to your doorstep."
  }
];

const About = () => {
  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="bg-linear-to-r from-orange-500 to-red-500 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            About Our Food Journey
          </motion.h1>
          <p className="max-w-2xl mx-auto text-lg opacity-90">
            Serving happiness on a plate with fresh, tasty, and healthy food.
          </p>
        </div>
      </section>

      {/* ABOUT CONTENT */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Who We Are
            </h2>
            <p className="text-gray-600 mb-4">
              We are a modern food brand focused on delivering delicious meals
              made from fresh ingredients. Our mission is to make quality food
              accessible, affordable, and enjoyable for everyone.
            </p>
            <p className="text-gray-600">
              Whether you crave street food, healthy meals, or comfort dishes,
              we bring flavors that satisfy your soul.
            </p>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe"
              alt="Food"
              className="rounded-2xl shadow-lg w-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Choose Us
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-gray-900">
            {features.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-md text-center"
              >
                <item.icon className="w-12 h-12 mx-auto text-orange-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-orange-500 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Taste the Difference Today</h2>
        <p className="mb-6 opacity-90">
          Order now and enjoy fresh, delicious food at your home.
        </p>
        <button className="bg-white text-orange-500 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
          Order Now
        </button>
      </section>
    </div>
  );
};

export default About;
