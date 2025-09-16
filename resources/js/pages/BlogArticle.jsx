// resources/js/pages/BlogArticle.jsx - AVEC COMMENTAIRES

import React from 'react';
import { Head, useForm, usePage, Link } from '@inertiajs/react';


export default function BlogArticle() {
    const { article, comments, canComment } = usePage().props;

    const { data, setData, post, reset, processing, errors } = useForm({
        content: '',
        article_id: article.id,
    });

    const submitComment = (e) => {
        e.preventDefault();
        post(route('comments.store'), {
            preserveScroll: true,
            onSuccess: () => reset('content'),
        });
    };

    return (
        <>
            <Head title={article.title} />

            <div className="container mx-auto py-12 px-4 max-w-4xl">
                {/* Article */}
                <article className="mb-12">
                    {article.image_url && (
                        <img
                            src={article.image_url}
                            alt={article.title}
                            className="w-full rounded-xl mb-8"
                        />
                    )}

                    <div className="mb-6">
                        <Link
                            href={`/blog/category/${article.category.slug}`}
                            className="text-purple-600 text-sm font-medium mb-2 inline-block"
                        >
                            {article.category.name}
                        </Link>
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">
                            {article.title}
                        </h1>
                        <div className="text-gray-600 text-sm">
                            Par {article.author} • {article.created_at}
                        </div>
                    </div>

                    <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                </article>

                {/* Section commentaires */}
                <section className="border-t pt-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Commentaires ({comments.length})
                    </h2>

                    {/* Formulaire d'ajout */}
                    {canComment ? (
                        <form onSubmit={submitComment} className="mb-8 bg-gray-50 p-6 rounded-lg">
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">
                                    Votre commentaire
                                </label>
                                <textarea
                                    value={data.content}
                                    onChange={e => setData('content', e.target.value)}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                    rows="4"
                                    placeholder="Partagez votre opinion..."
                                />
                                {errors.content && (
                                    <div className="text-red-500 text-sm mt-1">{errors.content}</div>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 disabled:opacity-50"
                            >
                                {processing ? 'Publication...' : 'Publier le commentaire'}
                            </button>
                        </form>
                    ) : (
                        <div className="mb-8 p-4 bg-gray-100 rounded-lg text-center">
                            <p className="text-gray-600">
                                <Link href="/login" className="text-purple-600 hover:underline">
                                    Connectez-vous
                                </Link>{' '}
                                pour laisser un commentaire
                            </p>
                        </div>
                    )}

                    {/* Liste des commentaires */}
                    <div className="space-y-6">
                        {comments.length > 0 ? (
                            comments.map((comment) => (
                                <div key={comment.id} className="border-l-4 border-purple-500 pl-6 py-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="text-sm text-gray-600">
                                            <span className="font-medium text-gray-800">
                                                {comment.user.name}
                                            </span>
                                            {' • '}
                                            {comment.created_at}
                                        </div>
                                        {comment.can_delete && (
                                            <Link
                                                href={route('comments.destroy', comment.id)}
                                                method="delete"
                                                as="button"
                                                className="text-red-500 text-sm hover:underline"
                                                onClick={(e) => {
                                                    if (!confirm('Supprimer ce commentaire ?')) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                            >
                                                Supprimer
                                            </Link>
                                        )}
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">
                                        {comment.content}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center py-8">
                                Aucun commentaire pour le moment. Soyez le premier à commenter !
                            </p>
                        )}
                    </div>
                </section>

                {/* Navigation */}
                <div className="mt-12 text-center">
                    <Link
                        href="/blog"
                        className="text-purple-600 hover:underline"
                    >
                        ← Retour au blog
                    </Link>
                </div>
            </div>
        </>
    );
}
