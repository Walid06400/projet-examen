import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function DangerZone({ user }) {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const { delete: destroy, processing } = useForm();

    const handleDeleteAccount = (e) => {
        e.preventDefault();

        if (!showConfirmation) {
            setShowConfirmation(true);
            return;
        }

        destroy(route('settings.profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => {
                // Redirection automatique vers la page d'accueil
                window.location.href = '/';
            },
            onError: (errors) => {
                console.error('Erreur lors de la suppression:', errors);
                setShowConfirmation(false);
            }
        });
    };

    const cancelDeletion = () => {
        setShowConfirmation(false);
    };

    return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-start">
                {/* Icône d'avertissement */}
                <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                </div>

                <div className="ml-3 flex-1">
                    <h3 className="text-lg font-medium text-red-900 mb-2">
                        Zone dangereuse
                    </h3>
                    <p className="text-sm text-red-700 mb-6">
                        Une fois votre compte supprimé, toutes vos données seront définitivement effacées.
                        Cette action est <strong>irréversible</strong>.
                    </p>

                    {!showConfirmation ? (
                        // Bouton initial
                        <button
                            onClick={handleDeleteAccount}
                            disabled={processing}
                            className="bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            Supprimer mon compte
                        </button>
                    ) : (
                        // Confirmation
                        <div className="bg-white border border-red-200 rounded-md p-4">
                            <p className="text-sm text-red-800 mb-4 font-medium">
                                ⚠️ Êtes-vous absolument certain(e) de vouloir supprimer votre compte ?
                            </p>
                            <p className="text-xs text-red-600 mb-4">
                                Tapez "SUPPRIMER" ci-dessous pour confirmer :
                            </p>
                            <input
                                type="text"
                                placeholder="Tapez SUPPRIMER"
                                className="w-full px-3 py-2 border border-red-300 rounded-md text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
                                onChange={(e) => {
                                    if (e.target.value === 'SUPPRIMER') {
                                        e.target.classList.add('bg-red-50');
                                    } else {
                                        e.target.classList.remove('bg-red-50');
                                    }
                                }}
                            />
                            <div className="flex gap-3">
                                <button
                                    onClick={handleDeleteAccount}
                                    disabled={processing}
                                    className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    {processing ? (
                                        <span className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Suppression...
                                        </span>
                                    ) : (
                                        'CONFIRMER LA SUPPRESSION'
                                    )}
                                </button>
                                <button
                                    onClick={cancelDeletion}
                                    disabled={processing}
                                    className="bg-gray-300 hover:bg-gray-400 disabled:opacity-50 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Annuler
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
