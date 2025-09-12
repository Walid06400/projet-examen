import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import AuthLayout from '@/layouts/auth-layout';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <AuthLayout>
            <Head title="Mot de passe oublié" />

            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Mot de passe oublié</h1>
                    <p className="text-gray-600 mt-2">
                        Saisissez votre email pour recevoir un lien de réinitialisation
                    </p>
                </div>

                {status && (
                    <div className="mb-4 font-medium text-sm text-green-600 text-center p-4 bg-green-50 rounded-md">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <Label htmlFor="email" required>Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            autoComplete="username"
                            placeholder="votre@email.com"
                            error={errors.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} />
                    </div>

                    <Button
                        type="submit"
                        disabled={processing}
                        className="w-full"
                    >
                        {processing ? (
                            <>
                                <LoaderCircle className="animate-spin -ml-1 mr-3 h-5 w-5" />
                                Envoi en cours...
                            </>
                        ) : (
                            'Envoyer le lien'
                        )}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Vous vous souvenez de votre mot de passe ?{' '}
                        <TextLink href={route('login')}>
                            Se connecter
                        </TextLink>
                    </p>
                </div>
            </div>
        </AuthLayout>
    );
}