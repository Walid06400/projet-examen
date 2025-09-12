import React from 'react';
import { Link } from '@inertiajs/react';
import { MessageSquare, Heart, Edit3, Calendar } from 'lucide-react';

export default function ActivityTab({ activities }) {
    const getActivityIcon = (type) => {
        switch (type) {
            case 'comment':
                return <MessageSquare className="w-5 h-5 text-purple-600" />;
            case 'reaction':
                return <Heart className="w-5 h-5 text-red-500" />;
            case 'article':
                return <Edit3 className="w-5 h-5 text-blue-500" />;
            default:
                return <MessageSquare className="w-5 h-5 text-gray-500" />;
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900">Activité récente</h3>
                <p className="text-gray-600">Vos dernières actions sur MAOlogie</p>
            </div>

            {activities && activities.length > 0 ? (
                <div className="space-y-4">
                    {activities.map((activity, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-lg flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                    {getActivityIcon(activity.type)}
                                </div>
                            </div>
                            <div className="flex-1">
                                <p className="text-gray-900">{activity.description}</p>
                                <div className="flex items-center mt-2 text-sm text-gray-500">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    {activity.created_at}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune activité récente</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Commencez à interagir avec la communauté !
                    </p>
                    <div className="mt-6">
                        <Link
                            href="/blog"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 transition-colors"
                        >
                            Explorer le blog
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
