import React from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import { Camera, Edit3, MapPin, Save, X } from 'lucide-react';

export default function ProfileTab({ 
    user, 
    data, 
    setData, 
    handleSubmit, 
    handleAvatarChange, 
    processing, 
    errors, 
    isEditing, 
    setIsEditing 
}) {
    return (
        <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
                {/* Avatar Section */}
                <div className="relative inline-block">
                    <img
                        className="w-32 h-32 rounded-full object-cover border-4 border-purple-500"
                        src={user.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&color=7c3aed&background=f3e8ff`}
                        alt={user.name}
                    />
                    <label
                        htmlFor="avatar-upload"
                        className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full cursor-pointer hover:bg-purple-700 transition-colors"
                    >
                        <Camera className="w-5 h-5" />
                        <input
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="hidden"
                        />
                    </label>
                </div>
                
                {errors.avatar && (
                    <p className="text-red-600 text-sm mt-2">{errors.avatar}</p>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Informations personnelles</h3>
                        {!isEditing ? (
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setIsEditing(true)}
                            >
                                <Edit3 className="w-4 h-4 mr-2" />
                                Modifier
                            </Button>
                        ) : (
                            <div className="flex space-x-2">
                                <Button
                                    type="submit"
                                    size="sm"
                                    disabled={processing}
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    {processing ? 'Sauvegarde...' : 'Sauvegarder'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setIsEditing(false)}
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {/* Nom */}
                        <div>
                            <Label htmlFor="name">Nom d'utilisateur</Label>
                            {isEditing ? (
                                <Input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    error={errors.name}
                                />
                            ) : (
                                <p className="mt-1 text-lg text-gray-900">{user.name}</p>
                            )}
                            {errors.name && (
                                <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <Label htmlFor="email">Email (non modifiable)</Label>
                            <p className="mt-1 text-lg text-gray-600">{user.email}</p>
                        </div>

                     
                      
                    </div>
                </div>
            </form>
        </div>
    );
}
