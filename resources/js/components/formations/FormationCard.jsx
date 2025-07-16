// resources/js/components/formations/FormationCard.jsx
import { Link } from "@inertiajs/react";
import { useCart } from "@/contexts/CartContext";
import { motion } from "framer-motion";

export default function FormationCard({ formation }) {
  const { addToCart } = useCart();

  // Protection contre formation undefined
  if (!formation) return null;

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow pb-4 flex flex-col h-full purple-shadow"
      whileHover={{ y: -4 }}
    >
      <Link href={route('formations.detail', formation.slug)}>
        <div className="bg-purple-600 text-white px-4 py-2 rounded-md
             transition-colors duration-200
             hover:bg-pink-500 focus:bg-pink-600">
          <img
            src={formation.image ? `/storage/${formation.image}` : "/images/formations/formation-default.png"}
            alt={formation.title}
            className="w-full h-48 object-cover rounded-t-xl"
            />
        </div>
      </Link>
      <div className="flex-1 flex flex-col p-6">
        <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2 flex-0">{formation.title}</h2>
        <p className="text-gray-500 text-sm mb-4 flex-1">{formation.description?.substring(0, 100) ?? ""}...</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-purple-700 font-semibold text-lg">{Number(formation.price).toFixed(2)} €</span>
          <button
            onClick={() => addToCart(formation)}
            className="ml-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition disabled:opacity-60"
            aria-label="Ajouter au panier"
          >
            Ajouter au panier
          </button>
        </div>
        <Link
          href={route("formations.detail", formation.slug)}
          className="block mt-4 text-purple-600 hover:underline text-sm text-center"
        >
          Voir la formation
        </Link>
      </div>
    </motion.div>
  );
}
