import { useEffect, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthLayout from '@/layouts/auth-layout';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import SuccessModal from '@/components/ui/SuccessModal'; // ✅ AJOUT MODAL

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    // ✅ ÉTAT POUR LA MODAL
    const [modal, setModal] = useState({
        open: false,
        message: '',
        type: 'success'
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post('/login', { // ✅ CORRIGÉ : URL directe au lieu de route()
            onSuccess: () => {
                // ✅ AFFICHAGE MODAL DE SUCCÈS
                setModal({
                    open: true,
                    message: 'Connexion réussie ! Redirection en cours...',
                    type: 'success'
                });
            },
            onError: () => {
                // ✅ AFFICHAGE MODAL D'ERREUR
                setModal({
                    open: true,
                    message: 'Erreur de connexion. Vérifiez vos identifiants.',
                    type: 'error'
                });
            }
        });
    };

    return (
        <AuthLayout>
            <Head title="Connexion" />

            {/* ✅ MODAL DE NOTIFICATION */}
            <SuccessModal
                open={modal.open}
                close={() => setModal({ ...modal, open: false })}
                message={modal.message}
                type={modal.type}
            />

            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Connexion</h1>
                    <p className="text-gray-600 mt-2">
                        Connectez-vous à votre compte MAOlogie
                    </p>
                </div>

                {status && (
                    <div className="mb-4 font-medium text-sm text-green-600">
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
                            error={!!errors.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div>
                        <Label htmlFor="password" required>Mot de passe</Label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            autoComplete="current-password"
                            placeholder="••••••••"
                            error={!!errors.password}
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Checkbox
                                id="remember"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <Label htmlFor="remember" className="ml-2 mb-0">
                                Se souvenir de moi
                            </Label>
                        </div>

                        {canResetPassword && (
                            <TextLink href="/forgot-password"> {/* ✅ CORRIGÉ : URL directe */}
                                Mot de passe oublié ?
                            </TextLink>
                        )}
                    </div>

                    <Button
                        type="submit"
                        disabled={processing}
                        className="w-full"
                    >
                        {processing ? 'Connexion...' : 'Se connecter'}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Pas encore de compte ?{' '}
                        <TextLink href="/register"> {/* ✅ CORRIGÉ : URL directe */}
                            Créer un compte
                        </TextLink>
                    </p>
                </div>
            </div>
        </AuthLayout>
    );
}
