// resources/js/pages/Dashboard.jsx
import { Head, Link, usePage, useForm, router } from '@inertiajs/react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import ProfileTab from '@/components/dashboard/ProfileTab';
import AppLayout from '@/layouts/app-layout';
import { useState, useRef, useEffect } from 'react';
import {
  Camera,
  Edit3,
  Loader2,
  CheckCircle,
  XCircle,
  MessageSquare,
  Heart,
  Calendar,
  BarChart3,
  User as UserIcon,
  TrendingUp,
  Clock,
  Star,
} from 'lucide-react';

export default function Dashboard() {
  const { auth, blogStats = {}, recentActivity = [], flash } = usePage().props;
  const [isEditingName, setIsEditingName] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [message, setMessage] = useState(null);
  const fileInputRef = useRef(null);

  const nameForm = useForm({ name: auth?.user?.name || '' });

  // Flash messages
  useEffect(() => {
    if (flash?.success) setMessage({ type: 'success', text: flash.success });
    if (flash?.error) setMessage({ type: 'error', text: flash.error });
  }, [flash]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    nameForm.post(route('profile.update'), {
      preserveScroll: true,
      onSuccess: () => {
        setIsEditingName(false);
        setMessage({ type: 'success', text: 'Nom mis à jour !' });
      },
      onError: () => {
        setMessage({ type: 'error', text: 'Erreur lors de la mise à jour.' });
      },
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg','image/png','image/jpg','image/gif','image/webp'];
    const maxSize = 5 * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
      setMessage({ type: 'error', text: 'Format non supporté.' });
      return;
    }

    if (file.size > maxSize) {
      setMessage({ type: 'error', text: 'Max 5MB.' });
      return;
    }

    setIsUploadingAvatar(true);
    setMessage(null);

    const formData = new FormData();
    formData.append('avatar', file);

    router.post('/settings/avatar/update', formData, {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        setIsUploadingAvatar(false);
        setMessage({ type: 'success', text: 'Avatar mis à jour !' });
        fileInputRef.current.value = '';
      },
      onError: (errors) => {
        setIsUploadingAvatar(false);
        setMessage({ type: 'error', text: errors.avatar || 'Erreur upload.' });
        fileInputRef.current.value = '';
      },
    });
  };

  if (!auth || !auth.user) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-600" />
          <p className="text-gray-600">Chargement...</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Head title="Dashboard - MAOlogie" />

      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-xl text-gray-600">
            Bienvenue <span className="text-purple-600 font-semibold">{auth.user.name}</span> !
          </p>
        </div>

        {/* Flash message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg flex items-center space-x-3 border ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 border-green-200'
              : 'bg-red-50 text-red-800 border-red-200'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
            ) : (
              <XCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <span className="font-medium">{message.text}</span>
            <button onClick={() => setMessage(null)} className="ml-auto text-sm hover:opacity-70">✕</button>
          </div>
        )}

        {/* Profile Section avec ProfileTab uniquement */}
        <div className="bg-white shadow-xl rounded-2xl p-8 mb-8 border border-gray-100">
          <ProfileTab />
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl p-6 flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold">{blogStats.comments_count || 0}</h2>
              <p className="mt-1">Commentaires</p>
            </div>
            <MessageSquare className="w-8 h-8 opacity-50" />
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl p-6 flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold">{blogStats.articles_commented || 0}</h2>
              <p className="mt-1">Articles commentés</p>
            </div>
            <BarChart3 className="w-8 h-8 opacity-50" />
          </div>
          <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-2xl p-6 flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold">{blogStats.favorite_category || 'Aucune'}</h2>
              <p className="mt-1">Catégorie favorite</p>
            </div>
            <TrendingUp className="w-8 h-8 opacity-50" />
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4">Vos dernières actions</h3>
          {recentActivity.length ? (
            <ul className="space-y-4">
              {recentActivity.map((activity) => (
                <li key={activity.id} className="flex items-center space-x-4">
                  {activity.type === 'comment' ? (
                    <MessageSquare className="w-5 h-5 text-purple-600" />
                  ) : (
                    <Heart className="w-5 h-5 text-red-600" />
                  )}
                  <span>{activity.description}</span>
                  <span className="ml-auto text-sm text-gray-400">{activity.date}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Aucune activité récente.</p>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
