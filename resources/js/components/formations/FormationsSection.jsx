// resources/js/components/formations/FormationsSection.jsx
import FormationCard from "./FormationCard";
import { usePage, Link } from "@inertiajs/react";

export default function FormationsSection() {
  const { formations = [] } = usePage().props;

  if (!formations || formations.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Nos Formations
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {formations.slice(0, 3).map((formation) => (
            <FormationCard key={formation.id} formation={formation} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href={route('formations')}
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition-colors"
          >
            Voir toutes nos formations
          </Link>
        </div>
      </div>
    </section>
  );
}
