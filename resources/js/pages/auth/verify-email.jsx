import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import TextLink from '@/components/text-link';
import Button from '@/components/ui/Button';
import AuthLayout from '@/layouts/auth-layout';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <AuthLayout>
            <Head title="Vérification email" />

            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Vérifiez votre email</h1>
                    <p className="text-gray-600 mt-2">
                        Un lien de vérification a été envoyé à votre adresse email. 
                        Cliquez sur le lien pour activer votre compte.
                    </p>
                </div>

                {status === 'verification-link-sent' && (
                    <div className="mb-4 font-medium text-sm text-green-600 text-center p-4 bg-green-50 rounded-md">
                        Un nouveau lien de vérification a été envoyé à votre adresse email.
                    </div>
                )}

                <form onSubmit={submit} className="space-y-6">
                    <Button
                        type="submit"
                        disabled={processing}
                        className="w-full"
                        variant="outline"
                    >
                        {processing ? (
                            <>
                                <LoaderCircle className="animate-spin -ml-1 mr-3 h-5 w-5" />
                                Envoi en cours...
                            </>
                        ) : (
                            'Renvoyer le lien de vérification'
                        )}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        <TextLink href={route('logout')} method="post" as="button">
                            Se déconnecter
                        </TextLink>
                    </p>
                </div>
            </div>
        </AuthLayout>
    );
}