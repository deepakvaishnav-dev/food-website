import { motion } from "framer-motion";
import biryani from "../assets/biryani.png";
import rolls from "../assets/rolls.png";
import noodles from "../assets/Noodles.jpg";
import samosa from "../assets/samosa.png";

import choleBhature from "../assets/chole-bhature.jpg";
import pakoda from "../assets/pakoda.jpg";
import shake from "../assets/Shake.avif";
import salad from "../assets/salad.jpg";
import khichdi from "../assets/Khichdi.png";
import icecream from "../assets/icecream.png";
import cake from "../assets/cake.png";
import burger from "../assets/burger.png";
import kachori from "../assets/Kachori.avif";
import momo from "../assets/momo.png";
import tea from "../assets/tea.jpg";
import pastry from "../assets/pastry.png";
import idli from "../assets/idli.png";
import coffee from "../assets/coffee.jpg";
import pavbhaji from "../assets/pavbhaji.png";

interface Category {
  name: string;
  img: string;
}

interface SliderRowProps {
  items: Category[];
  reverse?: boolean;
}

const categories: Category[] = [
  { name: "Biryani", img: biryani },
  { name: "Rolls", img: rolls },
  { name: "Noodles", img: noodles },
  { name: "Samosa", img: samosa },
  { name: "Pasta", img: noodles },
  { name: "Chole Bhature", img: choleBhature },
  { name: "Pakoda", img: pakoda },
  { name: "Shake", img: shake },
  { name: "Salad", img: salad },
  { name: "Khichdi", img: khichdi },
  { name: "Pizza", img: icecream },
  { name: "Cake", img: cake },
  { name: "Burger", img: burger },
  { name: "Kachori", img: kachori },
  { name: "Momo", img: momo },
  { name: "Tea", img: tea },
  { name: "Pastry", img: pastry },
  { name: "Dosa", img: idli },
  { name: "Coffee", img: coffee },
  { name: "Pav Bhaji", img: pavbhaji },
];

const row1 = categories.slice(0, 10);
const row2 = categories.slice(10);

function SliderRow({ items, reverse = false }: SliderRowProps) {
  return (
    <motion.div
      className="flex gap-6"
      animate={{ x: reverse ? ["-100%", "0%"] : ["0%", "-100%"] }}
      transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
    >
      {[...items, ...items].map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center min-w-30 cursor-pointer"
        >
          <div className="w-24 h-24 rounded-full  flex items-center justify-center shadow-sm">
            <img
              src={item.img}
              alt={item.name}
              className="w-16 h-16 object-contain"
            />
          </div>
          <p className="mt-2 text-xs font-medium ">{item.name}</p>
        </div>
      ))}
    </motion.div>
  );
}

export default function FoodCategories() {
  return (
    <section className="w-full py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6 text-center text-white">
          Explore Categories
        </h2>

        <div className="space-y-6">
          {/* Row 1 */}
          <SliderRow items={row1} />

          {/* Row 2 */}
          <SliderRow items={row2} reverse />
        </div>
      </div>
    </section>
  );
}
