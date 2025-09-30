import { useEffect, useState } from "react";
import { Head, useForm, router } from "@inertiajs/react";
import toast from "react-hot-toast";
import InputError from "@/components/input-error";
import TextLink from "@/components/text-link";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import AuthLayout from "@/layouts/auth-layout";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => reset("password");
    }, []);

    const submit = (e) => {
        e.preventDefault();

        // 🚨 VALIDATION FRONTEND CRITIQUE
        if (!data.email || !data.password) {
            toast.error("Email et mot de passe requis");
            return;
        }

        post("/login", {
            onSuccess: () => {
                toast.success("Connexion réussie !");
                router.visit("/dashboard");
            },
            onError: (errors) => {
                console.error("❌ Erreurs de connexion:", errors);
                if (errors.email || errors.password) {
                    toast.error("Identifiants invalides");
                } else {
                    toast.error("Erreur de connexion, vérifiez vos identifiants");
                }
            },
        });
    };

    return (
        <AuthLayout>
            <Head title="Connexion" />

            <div className="w-full max-w-md mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Connexion</h1>
                    <p className="mt-2 text-gray-600">
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
                        <Label htmlFor="email" value="Email" />
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
                            placeholder="votre@email.com"
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div>
                        <Label htmlFor="password" value="Mot de passe" />
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="current-password"
                            onChange={(e) => setData("password", e.target.value)}
                            placeholder="••••••••"
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData("remember", e.target.checked)}
                            />
                            <span className="ml-2 text-sm text-gray-600">
                                Se souvenir de moi
                            </span>
                        </label>

                        {canResetPassword && (
                            <TextLink
                                href="/forgot-password"
                                className="text-sm text-purple-600 hover:text-purple-500"
                            >
                                Mot de passe oublié ?
                            </TextLink>
                        )}
                    </div>

                    <div className="flex items-center justify-end gap-4">
                        <TextLink
                            href="/register"
                            className="text-sm text-gray-600 hover:text-gray-900"
                        >
                            Pas encore de compte ?
                        </TextLink>

                        <Button className="ml-4" disabled={processing}>
                            {processing ? "Connexion..." : "Se connecter"}
                        </Button>
                    </div>
                </form>

                {/* 🧪 SECTION DEBUG TEMPORAIRE */}
                <div className="mt-8 p-4 bg-yellow-50 rounded-md">
                    <h3 className="text-sm font-medium text-yellow-800">
                        🧪 Comptes de test disponibles :
                    </h3>
                    <div className="mt-2 text-xs text-yellow-700">
                        <div>• Admin: admin@maologie.fr / password</div>
                        <div>• User: user@maologie.fr / password</div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
