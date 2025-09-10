import React from 'react';
import { Edit3, MessageSquare, Heart, ThumbsUp, Award } from 'lucide-react';

export default function StatsTab({ stats }) {
    const defaultStats = {
        articles_count: 0,
        comments_count: 0,
        reactions_given: 0,
        reactions_received: 0,
        total_interactions: 0,
        ...stats
    };

    const statCards = [
        {
            label: 'Articles publiés',
            value: defaultStats.articles_count,
            icon: Edit3,
            color: 'bg-blue-500',
        },
        {
            label: 'Commentaires',
            value: defaultStats.comments_count,
            icon: MessageSquare,
            color: 'bg-green-500',
        },
        {
            label: 'Réactions données',
            value: defaultStats.reactions_given,
            icon: Heart,
            color: 'bg-red-500',
        },
        {
            label: 'Réactions reçues',
            value: defaultStats.reactions_received,
            icon: ThumbsUp,
            color: 'bg-purple-500',
        },
        {
            label: 'Total interactions',
            value: defaultStats.total_interactions,
            icon: Award,
            color: 'bg-yellow-500',
        },
    ];

    const getProgressionMessage = (interactions) => {
        if (interactions < 10) {
            return "🌱 Continuez à interagir pour progresser !";
        } else if (interactions >= 10 && interactions < 25) {
            return "🚀 Bon début ! Vous êtes actif sur MAOlogie.";
        } else if (interactions >= 25 && interactions < 50) {
            return "⭐ Excellent ! Vous êtes un membre engagé.";
        } else {
            return "🏆 Bravo ! Vous êtes un expert de la communauté !";
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900">Vos statistiques</h3>
                <p className="text-gray-600">Suivez votre activité sur MAOlogie</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {statCards.map((card, index) => {
                    const Icon = card.icon;
                    return (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                            <div className="flex items-center">
                                <div className={`${card.color} p-3 rounded-lg`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">{card.label}</p>
                                    <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Niveau d'activité */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Niveau d'activité</h4>
                <div className="relative">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Débutant</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-3">
                            <div 
                                className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                                style={{ 
                                    width: `${Math.min((defaultStats.total_interactions / 50) * 100, 100)}%`
                                }}
                            />
                        </div>
                        <span className="text-sm text-gray-600">Expert</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                        {getProgressionMessage(defaultStats.total_interactions)}
                    </p>
                </div>
            </div>
        </div>
    );
}
