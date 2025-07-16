// resources/js/pages/Formations.jsx
import { Head, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import FormationCard from "@/components/formations/FormationCard";

export default function Formations() {
  const { formations } = usePage().props;

  return (
    <AppLayout>
      <Head title="Formations | MAOlogie" />
      <div className="container mx-auto py-16 px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Toutes nos formations</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {formations && formations.length > 0 ? (
            formations.map((formation) => (
              <FormationCard key={formation.id} formation={formation} />
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-500">Aucune formation disponible actuellement.</p>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
