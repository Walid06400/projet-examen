// resources/js/pages/Dashboard.jsx
import { Head, Link, usePage, useForm, router } from '@inertiajs/react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useState, useRef, useEffect } from 'react';
import {
  Camera, Edit3, Loader2, CheckCircle, XCircle,
  MessageSquare, Heart, Calendar, BarChart3, User,
  TrendingUp, Clock, Star
} from 'lucide-react';

export default function Dashboard() {
  const { auth, blogStats = {}, recentActivity = [], flash } = usePage().props;
  const [isEditingName, setIsEditingName] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [message, setMessage] = useState(null);
  const fileInputRef = useRef(null);

  const nameForm = useForm({ name: auth?.user?.name || '' });

  // ✅ Gérer les messages Flash de Laravel
  useEffect(() => {
    if (flash?.success) {
      setMessage({ type: 'success', text: flash.success });
    }
    if (flash?.error) {
      setMessage({ type: 'error', text: flash.error });
    }
  }, [flash]);

  // ✅ Auto-fermeture des messages après 5 secondes
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    nameForm.post('/profile', {
      preserveScroll: true,
      onSuccess: () => {
        setIsEditingName(false);
        setMessage({ type: 'success', text: 'Nom mis à jour avec succès !' });
      },
      onError: () => {
        setMessage({ type: 'error', text: 'Erreur lors de la mise à jour du nom.' });
      }
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // ✅ VALIDATION CÔTÉ CLIENT RENFORCÉE
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      setMessage({
        type: 'error',
        text: 'Format non supporté. Utilisez: JPG, PNG, GIF, WEBP.'
      });
      return;
    }

    if (file.size > maxSize) {
      setMessage({
        type: 'error',
        text: 'Fichier trop volumineux. Maximum 5MB.'
      });
      return;
    }

    // ✅ Upload avec feedback visuel
    setIsUploadingAvatar(true);
    setMessage(null);

    const formData = new FormData();
    formData.append('avatar', file);

    router.post('/user/avatar/update', formData, {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        setIsUploadingAvatar(false);
        setMessage({
          type: 'success',
          text: 'Avatar mis à jour ! (300x300px, optimisé)'
        });
        fileInputRef.current.value = '';
      },
      onError: (errors) => {
        setIsUploadingAvatar(false);
        setMessage({
          type: 'error',
          text: errors.avatar || 'Erreur lors de l\'upload de l\'avatar.'
        });
        fileInputRef.current.value = '';
      }
    });
  };

  if (!auth || !auth.user) {
    return (
      <>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-600" />
            <p className="text-gray-600">Chargement de votre dashboard...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head title="Dashboard - MAOlogie" />

      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">

        {/* ✅ EN-TÊTE DASHBOARD */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-xl text-gray-600">
            Bienvenue <span className="text-purple-600 font-semibold">{auth.user.name}</span> !
          </p>
        </div>

        {/* ✅ MESSAGE DE FEEDBACK */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg flex items-center space-x-3 shadow-sm border ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 border-green-200'
              : 'bg-red-50 text-red-800 border-red-200'
          }`}>
            {message.type === 'success' ?
              <CheckCircle className="w-5 h-5 flex-shrink-0" /> :
              <XCircle className="w-5 h-5 flex-shrink-0" />
            }
            <span className="font-medium">{message.text}</span>
            <button
              onClick={() => setMessage(null)}
              className="ml-auto text-sm hover:opacity-70"
            >
              ✕
            </button>
          </div>
        )}

        {/* ✅ CARTE PROFIL UTILISATEUR */}
        <div className="bg-white shadow-xl rounded-2xl p-8 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">

            {/* Avatar avec upload */}
            <div className="relative group">
              <img
                src={auth.user.avatar_url}
                alt={`Avatar de ${auth.user.name}`}
                className="w-36 h-36 rounded-full object-cover border-4 border-purple-600 shadow-lg transition-all duration-300 group-hover:shadow-xl"
              />

              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 p-3 rounded-full cursor-pointer transition-all duration-200 shadow-lg ${
                  isUploadingAvatar
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700 hover:scale-110'
                } text-white`}
                title={isUploadingAvatar ? 'Upload en cours...' : 'Changer l\'avatar'}
              >
                {isUploadingAvatar ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Camera className="w-5 h-5" />
                )}

                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                  onChange={handleAvatarChange}
                  disabled={isUploadingAvatar}
                  className="hidden"
                  ref={fileInputRef}
                />
              </label>

              {/* Indication taille */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                <span className="text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  300x300px • Max 5MB
                </span>
              </div>
            </div>

            {/* Informations utilisateur */}
            <div className="flex-1 text-center lg:text-left">
              <form onSubmit={handleNameSubmit} className="mb-4">
                <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4">
                  {isEditingName ? (
                    <>
                      <Input
                        value={nameForm.data.name}
                        onChange={(e) => nameForm.setData('name', e.target.value)}
                        className="flex-1 text-center lg:text-left text-lg font-semibold"
                        placeholder="Votre nom complet"
                        required
                      />
                      <div className="flex space-x-2">
                        <Button
                          type="submit"
                          disabled={nameForm.processing}
                          size="sm"
                        >
                          {nameForm.processing ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                              Sauvegarde...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Sauvegarder
                            </>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsEditingName(false);
                            nameForm.reset();
                          }}
                          size="sm"
                        >
                          Annuler
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold text-gray-900 mb-1">
                          {auth.user.name}
                        </h2>
                        <p className="text-gray-600 text-lg mb-2">{auth.user.email}</p>
                        <div className="flex items-center justify-center lg:justify-start space-x-2">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            auth.user.is_admin
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {auth.user.is_admin ? (
                              <>
                                <Star className="w-4 h-4 mr-1" />
                                Administrateur
                              </>
                            ) : (
                              <>
                                <User className="w-4 h-4 mr-1" />
                                Utilisateur
                              </>
                            )}
                          </span>
                        </div>
                      </div>

                      <Button
                        onClick={() => setIsEditingName(true)}
                        variant="outline"
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        Modifier le nom
                      </Button>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* ✅ STATISTIQUES EN GRILLE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">
                  {blogStats.total_comments || 0}
                </div>
                <div className="text-purple-100">Commentaires</div>
              </div>
              <MessageSquare className="w-10 h-10 text-purple-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">
                  {blogStats.articles_commented || 0}
                </div>
                <div className="text-blue-100">Articles commentés</div>
              </div>
              <BarChart3 className="w-10 h-10 text-blue-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold mb-1">
                  {blogStats.favorite_category || 'Aucune'}
                </div>
                <div className="text-green-100">Catégorie favorite</div>
              </div>
              <TrendingUp className="w-10 h-10 text-green-200" />
            </div>
          </div>
        </div>

        {/* ✅ ACTIVITÉ RÉCENTE */}
        <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center">
              <Clock className="w-6 h-6 mr-2 text-purple-600" />
              Activité récente
            </h3>
            {recentActivity.length > 0 && (
              <Link
                href="/blog"
                className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center"
              >
                Voir le blog
                <TrendingUp className="w-4 h-4 ml-1" />
              </Link>
            )}
          </div>

          {recentActivity.length > 0 ? (
            <div className="space-y-4">
              {recentActivity.map((activity, idx) => (
                <div
                  key={idx}
                  className="border-l-4 border-purple-500 pl-6 py-4 bg-gradient-to-r from-purple-50 to-transparent rounded-r-lg hover:from-purple-100 transition-colors duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 mb-1">
                        Commentaire sur{' '}
                        <Link
                          href={`/blog/${activity.article_slug}`}
                          className="text-purple-600 hover:text-purple-700 hover:underline"
                        >
                          {activity.article_title}
                        </Link>
                      </p>
                      <p className="text-gray-700 mb-2">{activity.content}</p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {activity.created_at}
                      </p>
                    </div>
                    <MessageSquare className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">💬</div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Aucune activité récente
              </h4>
              <p className="text-gray-600 mb-6">
                Commencez à interagir avec la communauté MAOlogie !
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Explorer le blog
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
