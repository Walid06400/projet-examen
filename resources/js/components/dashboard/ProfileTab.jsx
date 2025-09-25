// resources/js/components/dashboard/ProfileTab.jsx
import { useState } from 'react';
import { useForm, router, usePage } from '@inertiajs/react';
import SuccessModal from '@/components/ui/SuccessModal';
import {
  MapPin,
  Globe,
  FileText,
  Camera,
  Edit3,
  Save,
  X,
  Loader2,
} from 'lucide-react';

export default function ProfileTab() {
  const { auth } = usePage().props;
  const user = auth.user;

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { data, setData, post, processing, errors, reset, isDirty } = useForm({
    name: user.name || '',
    bio: user.bio || '',
    location: user.location || '',
    website: user.website || '',
    avatar: null,
  });

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData('avatar', file);
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ✅ CORRECTION : Route cohérente
    post('/settings/profile', {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        setIsEditing(false);
        setAvatarPreview(null);
        reset('avatar');
        setShowModal(true);
        setTimeout(() => setShowModal(false), 3000);
      },
    });
  };

  const getAvatarUrl = () => avatarPreview || user.avatar_url;

  return (
    <>
      {showModal && (
        <SuccessModal onClose={() => setShowModal(false)}>
          Profil mis à jour avec succès !
        </SuccessModal>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Avatar & Nom */}
        <div className="flex items-center space-x-6">
          <div className="relative group">
            <img
              src={getAvatarUrl()}
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover border-4 border-purple-300 shadow-lg"
              onError={(e) => {
                e.target.src = user.avatar_url;
              }}
            />
            {isEditing && (
              <label className="absolute bottom-0 right-0 p-2 bg-purple-600 text-white rounded-full cursor-pointer hover:bg-purple-700 transition">
                <Camera className="w-5 h-5" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
          <div className="flex-1">
            {!isEditing ? (
              <h4 className="text-lg font-semibold text-gray-900">{user.name}</h4>
            ) : (
              <input
                type="text"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Nom complet"
              />
            )}
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="flex items-center space-x-2 mb-2">
            <FileText className="w-5 h-5 text-purple-600" />
            <span className="font-medium text-gray-700">Bio</span>
          </label>
          {!isEditing ? (
            <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
              {user.bio || 'Aucune bio renseignée'}
            </p>
          ) : (
            <textarea
              value={data.bio}
              onChange={(e) => setData('bio', e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              placeholder="Parlez de vous..."
            />
          )}
          {errors.bio && <p className="text-red-600 text-sm mt-1">{errors.bio}</p>}
        </div>

        {/* Localisation */}
        <div>
          <label className="flex items-center space-x-2 mb-2">
            <MapPin className="w-5 h-5 text-purple-600" />
            <span className="font-medium text-gray-700">Localisation</span>
          </label>
          {!isEditing ? (
            <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
              {user.location || 'Non renseignée'}
            </p>
          ) : (
            <input
              type="text"
              value={data.location}
              onChange={(e) => setData('location', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Ville, Pays"
            />
          )}
          {errors.location && <p className="text-red-600 text-sm mt-1">{errors.location}</p>}
        </div>

        {/* Site Web */}
        <div>
          <label className="flex items-center space-x-2 mb-2">
            <Globe className="w-5 h-5 text-purple-600" />
            <span className="font-medium text-gray-700">Site web</span>
          </label>
          {!isEditing ? (
            <div className="bg-gray-50 p-4 rounded-lg">
              {user.website ? (
                <a
                  href={user.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 underline hover:text-purple-800"
                >
                  {user.website}
                </a>
              ) : (
                <p className="text-gray-600">Non renseigné</p>
              )}
            </div>
          ) : (
            <input
              type="url"
              value={data.website}
              onChange={(e) => setData('website', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="https://votre-site.com"
            />
          )}
          {errors.website && <p className="text-red-600 text-sm mt-1">{errors.website}</p>}
        </div>

        {/* Actions */}
        <div className="flex space-x-4">
          {isEditing ? (
            <>
              <button
                type="submit"
                disabled={processing || !isDirty}
                className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {processing ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                <span>Sauvegarder</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setAvatarPreview(null);
                  reset();
                }}
                className="flex items-center space-x-2 bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                <X className="w-5 h-5" />
                <span>Annuler</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              <Edit3 className="w-5 h-5" />
              <span>Modifier le profil</span>
            </button>
          )}
        </div>
      </form>
    </>
  );
}
