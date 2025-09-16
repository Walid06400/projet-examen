// ProfileTab.jsx - Version étendue complète
import { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function ProfileTab({ user }) {
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
        location: user.location || '',
        avatar: null,
    });

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('avatar', file);

            // Prévisualisation
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('profile.update'), {
            forceFormData: true,
            onSuccess: () => {
                setIsEditing(false);
                setAvatarPreview(null);
                reset('avatar');
            },
            onError: (errors) => {
                console.error('Erreurs de validation:', errors);
            }
        });
    };

    const getCurrentAvatarUrl = () => {
        if (avatarPreview) return avatarPreview;
        if (user.avatar) return `/storage/avatars/${user.avatar}`;
        return null;
    };

    const getInitials = (name) => {
        if (!name) return 'U';
        return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Profil Utilisateur
                </h3>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                    {isEditing ? 'Annuler' : 'Modifier'}
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Section Avatar */}
                <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
                    <div className="flex-shrink-0 mb-4 md:mb-0">
                        <div className="relative">
                            {getCurrentAvatarUrl() ? (
                                <img
                                    src={getCurrentAvatarUrl()}
                                    alt="Avatar"
                                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-300 dark:border-gray-600"
                                />
                            ) : (
                                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold border-4 border-gray-300 dark:border-gray-600">
                                    {getInitials(data.name)}
                                </div>
                            )}

                            {isEditing && (
                                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    </div>

                    {isEditing && (
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Photo de profil
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            {errors.avatar && (
                                <p className="mt-1 text-sm text-red-600">{errors.avatar}</p>
                            )}
                        </div>
                    )}
                </div>

                {/* Informations personnelles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Nom complet
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="Votre nom complet"
                            />
                        ) : (
                            <p className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900 dark:bg-gray-700 dark:text-white">
                                {data.name || 'Non renseigné'}
                            </p>
                        )}
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email
                        </label>
                        {isEditing ? (
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="votre@email.com"
                            />
                        ) : (
                            <p className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900 dark:bg-gray-700 dark:text-white">
                                {data.email}
                            </p>
                        )}
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Localisation
                    </label>
                    {isEditing ? (
                        <input
                            type="text"
                            value={data.location}
                            onChange={(e) => setData('location', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Votre ville, région..."
                        />
                    ) : (
                        <p className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900 dark:bg-gray-700 dark:text-white">
                            {data.location || 'Non renseignée'}
                        </p>
                    )}
                    {errors.location && (
                        <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Biographie
                    </label>
                    {isEditing ? (
                        <textarea
                            value={data.bio}
                            onChange={(e) => setData('bio', e.target.value)}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Parlez-nous de vous, vos passions musicales, votre expérience en MAO..."
                        />
                    ) : (
                        <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900 dark:bg-gray-700 dark:text-white min-h-[100px]">
                            {data.bio || 'Aucune biographie renseignée'}
                        </div>
                    )}
                    {errors.bio && (
                        <p className="mt-1 text-sm text-red-600">{errors.bio}</p>
                    )}
                </div>

                {isEditing && (
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => {
                                setIsEditing(false);
                                setAvatarPreview(null);
                                reset();
                            }}
                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200"
                        >
                            {processing ? 'Enregistrement...' : 'Enregistrer'}
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
}
