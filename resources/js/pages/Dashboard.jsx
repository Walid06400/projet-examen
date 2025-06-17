import { Head, Link, usePage } from '@inertiajs/react';
import AuthLayout from '../layouts/auth-layout'; // Chemin corrigé

export default function Dashboard() {
    const { auth } = usePage().props;

    return (
        <AuthLayout>
            <Head title="Dashboard" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="text-2xl font-bold mb-6">
                                Tableau de bord - {auth.user.name}
                            </h1>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-blue-50 p-4 rounded">
                                    <h3 className="font-semibold">Mes formations</h3>
                                    <p className="text-gray-600">Gérer vos formations achetées</p>
                                </div>
                                
                                <div className="bg-green-50 p-4 rounded">
                                    <h3 className="font-semibold">Mon activité forum</h3>
                                    <p className="text-gray-600">Vos sujets et commentaires</p>
                                </div>
                            </div>

                            {/* Lien admin conditionnel */}
                            {auth.user.is_admin && (
                                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded">
                                    <a 
                                        href="/admin" 
                                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                    >
                                        Accéder à l'administration Filament
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
