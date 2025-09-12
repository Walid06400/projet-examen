import { useEffect, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthLayout from '@/layouts/auth-layout';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import SuccessModal from '@/components/ui/SuccessModal'; // ✅ AJOUT MODAL

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    // ✅ ÉTAT POUR LA MODAL
    const [modal, setModal] = useState({
        open: false,
        message: '',
        type: 'success'
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post('/register', { // ✅ CORRIGÉ : URL directe
            onSuccess: () => {
                setModal({
                    open: true,
                    message: 'Compte créé avec succès ! Bienvenue sur MAOlogie !',
                    type: 'success'
                });
            },
            onError: () => {
                setModal({
                    open: true,
                    message: 'Erreur lors de la création du compte. Vérifiez les informations saisies.',
                    type: 'error'
                });
            }
        });
    };

    return (
        <AuthLayout>
            <Head title="Inscription" />

            {/* ✅ MODAL DE NOTIFICATION */}
            <SuccessModal
                open={modal.open}
                close={() => setModal({ ...modal, open: false })}
                message={modal.message}
                type={modal.type}
            />

            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Inscription</h1>
                    <p className="text-gray-600 mt-2">
                        Créez votre compte MAOlogie gratuitement
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <Label htmlFor="name" required>Nom complet</Label>
                        <Input
                            id="name"
                            name="name"
                            value={data.name}
                            autoComplete="name"
                            placeholder="Votre nom complet"
                            error={!!errors.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        <InputError message={errors.name} />
                    </div>

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
                            autoComplete="new-password"
                            placeholder="••••••••"
                            error={!!errors.password}
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div>
                        <Label htmlFor="password_confirmation" required>
                            Confirmer le mot de passe
                        </Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            autoComplete="new-password"
                            placeholder="••••••••"
                            error={!!errors.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button
                        type="submit"
                        disabled={processing}
                        className="w-full"
                    >
                        {processing ? 'Création du compte...' : 'Créer mon compte'}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Déjà un compte ?{' '}
                        <TextLink href="/login"> {/* ✅ CORRIGÉ : URL directe */}
                            Se connecter
                        </TextLink>
                    </p>
                </div>
            </div>
        </AuthLayout>
    );
}
