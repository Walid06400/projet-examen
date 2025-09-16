// Components/UserAvatar.jsx - Composant réutilisable complet
import { useState } from 'react';

export default function UserAvatar({
    user,
    size = 'md',
    showName = false,
    clickable = false,
    className = ''
}) {
    const [imageError, setImageError] = useState(false);

    const getInitials = (name) => {
        if (!name) return 'U';
        return name.split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const getAvatarUrl = (avatar) => {
        if (!avatar || imageError) return null;
        return `/storage/avatars/${avatar}`;
    };

    const handleImageError = () => {
        setImageError(true);
    };

    // Tailles prédéfinies
    const sizeClasses = {
        xs: 'w-6 h-6 text-xs',
        sm: 'w-8 h-8 text-sm',
        md: 'w-12 h-12 text-base',
        lg: 'w-16 h-16 text-lg',
        xl: 'w-24 h-24 text-xl'
    };

    const avatarUrl = getAvatarUrl(user?.avatar);
    const initials = getInitials(user?.name);
    const sizeClass = sizeClasses[size] || sizeClasses.md;

    const avatarElement = (
        <div className={`flex items-center space-x-2 ${className}`}>
            <div className="flex-shrink-0">
                {avatarUrl ? (
                    <img
                        src={avatarUrl}
                        alt={`Avatar de ${user?.name || 'Utilisateur'}`}
                        className={`${sizeClass} rounded-full object-cover border-2 border-gray-300 dark:border-gray-600 shadow-sm`}
                        onError={handleImageError}
                    />
                ) : (
                    <div className={`${sizeClass} rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium border-2 border-gray-300 dark:border-gray-600 shadow-sm`}>
                        {initials}
                    </div>
                )}
            </div>

            {showName && user?.name && (
                <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {user.name}
                </span>
            )}
        </div>
    );

    if (clickable) {
        return (
            <button
                className="hover:opacity-80 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full"
                title={user?.name || 'Profil utilisateur'}
            >
                {avatarElement}
            </button>
        );
    }

    return avatarElement;
}
