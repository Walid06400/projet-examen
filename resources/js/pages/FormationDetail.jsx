// resources/js/pages/FormationDetail.jsx
import { Head, usePage, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { useCart } from "@/contexts/CartContext";

export default function FormationDetail() {
  const { formation } = usePage().props;
  const { addToCart } = useCart();

  if (!formation) {
    return (
      <AppLayout>
        <div className="container mx-auto py-16 px-4 text-center">
          <p className="text-xl text-gray-500">Formation introuvable.</p>
          <Link href={route('formations')} className="mt-4 inline-block text-purple-600 hover:underline">
            Retour aux formations
          </Link>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Head title={formation.title || "Formation"} />
      <div className="container mx-auto py-16 px-4 max-w-4xl">
        <div className="mb-8">
          <button
            onClick={() => history.back()}
            className="text-purple-600 hover:underline bg-gray-50 px-2 py-1 rounded"
          >
            ← Retour à la liste
          </button>
        </div>
        <div className="bg-white rounded-xl p-8 shadow-xl relative">
          <img
            src={formation.image ? `/storage/${formation.image}` : "/images/formations/formation-default.png"}
            alt={formation.title}
            className="w-full h-64 object-cover rounded-xl mb-8"
          />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{formation.title}</h1>
          <div className="flex items-center mb-6 space-x-4">
            <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded">{formation.level ?? "Tous niveaux"}</span>
            <span className="font-bold text-purple-600 text-lg">{Number(formation.price).toFixed(2)} €</span>
          </div>
          <div className="prose max-w-none mb-6">{formation.description}</div>
          <button
            onClick={() => addToCart(formation)}
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-lg shadow hover:bg-purple-700 transition mt-2"
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
