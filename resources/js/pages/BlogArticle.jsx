import { useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';


export default function BlogArticle() {
    const { article, comments, relatedArticles, canComment } = usePage().props;
    const [showCommentForm, setShowCommentForm] = useState(false);

    // Formulaire de commentaire
    const { data, setData, post, reset, processing, errors } = useForm({
        content: '',
        article_id: article ? article.id : null,
    });

    const submitComment = (e) => {
        e.preventDefault();
        post('/comments', {
            preserveScroll: true,
            onSuccess: () => {
                reset('content');
                setShowCommentForm(false);
            },
        });
    };

    // Protection contre les données manquantes
    if (!article) {
        return (
            <>
                <Head title="Article introuvable" />
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">Article introuvable</h1>
                        <Link
                            href="/blog"
                            className="text-purple-600 hover:text-purple-700 font-medium"
                        >
                            Retour au blog
                        </Link>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Head title={article.title} />

            <article className="bg-white">
                {/* Header de l'article */}
                <div className="relative">
                    {article.image && (
                        <div className="aspect-w-16 aspect-h-9 lg:aspect-h-6">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-64 lg:h-96 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>
                    )}

                    {/* Navigation breadcrumb */}
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                            <Link href="/" className="hover:text-purple-600 transition-colors">
                                Accueil
                            </Link>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
                            </svg>
                            <Link href="/blog" className="hover:text-purple-600 transition-colors">
                                Blog
                            </Link>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
                            </svg>
                            <span className="text-gray-900">{article.title}</span>
                        </nav>
                    </div>
                </div>

                {/* Contenu principal */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    {/* En-tête de l'article */}
                    <header className="mb-8">
                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            {article.title}
                        </h1>

                        {/* Métadonnées */}
                        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
                            <div className="flex items-center space-x-2">
                                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                    <span className="text-purple-600 font-semibold">
                                        {article.author?.name?.charAt(0) || 'A'}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">
                                        {article.author?.name || 'Auteur anonyme'}
                                    </p>
                                    <p>{article.published_at}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <span className="flex items-center space-x-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{article.read_time}</span>
                                </span>

                                {article.category && (
                                    <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                                        {article.category.name}
                                    </span>
                                )}

                                <span className="flex items-center space-x-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    <span>{comments ? comments.length : 0} commentaires</span>
                                </span>
                            </div>
                        </div>
                    </header>

                    {/* Contenu de l'article */}
                    <div className="prose prose-lg max-w-none mb-12">
                        <div dangerouslySetInnerHTML={{ __html: article.content }} />
                    </div>

                    {/* Section commentaires */}
                    <div className="border-t border-gray-200 pt-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-gray-900">
                                Commentaires ({comments ? comments.length : 0})
                            </h3>

                            {canComment && (
                                <button
                                    onClick={() => setShowCommentForm(!showCommentForm)}
                                    className="inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors duration-200"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Ajouter un commentaire
                                </button>
                            )}
                        </div>

                        {/* Formulaire de commentaire */}
                        {showCommentForm && canComment && (
                            <form onSubmit={submitComment} className="bg-gray-50 rounded-lg p-6 mb-8">
                                <div className="mb-4">
                                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                                        Votre commentaire
                                    </label>
                                    <textarea
                                        id="comment"
                                        rows={4}
                                        value={data.content}
                                        onChange={(e) => setData('content', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder="Partagez votre avis sur cet article..."
                                        required
                                    />
                                    {errors.content && (
                                        <p className="text-red-600 text-sm mt-1">{errors.content}</p>
                                    )}
                                </div>
                                <div className="flex space-x-3">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-6 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors duration-200"
                                    >
                                        {processing ? 'Publication...' : 'Publier'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowCommentForm(false)}
                                        className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                    >
                                        Annuler
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* Liste des commentaires */}
                        <div className="space-y-6">
                            {comments && comments.length > 0 ? (
                                comments.map((comment) => (
                                    <div key={comment.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                                        <div className="flex items-start space-x-4">
                                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-purple-600 font-semibold text-sm">
                                                    {comment.author?.name?.charAt(0) || 'U'}
                                                </span>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <h4 className="font-medium text-gray-900">
                                                        {comment.author?.name || 'Utilisateur'}
                                                    </h4>
                                                    <span className="text-sm text-gray-500">
                                                        {comment.created_at}
                                                    </span>
                                                </div>
                                                <p className="text-gray-700 leading-relaxed">
                                                    {comment.content}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">Aucun commentaire pour le moment.</p>
                                    {!canComment && (
                                        <p className="text-sm text-gray-400 mt-2">
                                            <Link href="/login" className="text-purple-600 hover:underline">
                                                Connectez-vous
                                            </Link> pour être le premier à commenter.
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Articles similaires */}
                    {relatedArticles && relatedArticles.length > 0 && (
                        <div className="border-t border-gray-200 pt-12 mt-12">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Articles similaires</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedArticles.map((relatedArticle) => (
                                    <Link
                                        key={relatedArticle.id}
                                        href={`/blog/${relatedArticle.slug}`}
                                        className="group bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200"
                                    >
                                        {relatedArticle.image && (
                                            <img
                                                src={relatedArticle.image}
                                                alt={relatedArticle.title}
                                                className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-200"
                                            />
                                        )}
                                        <div className="p-4">
                                            {relatedArticle.category && (
                                                <span className="inline-block bg-purple-100 text-purple-700 text-xs font-medium px-2 py-1 rounded-full mb-2">
                                                    {relatedArticle.category.name}
                                                </span>
                                            )}
                                            <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                                                {relatedArticle.title}
                                            </h4>
                                            <p className="text-sm text-gray-500">
                                                {relatedArticle.published_at}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </article>
        </>
    );
}
