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
    post("/login", {
      onSuccess: () => {
        toast.success("Connexion réussie !");
        router.visit("/blog");
      },
      onError: () => toast.error("Identifiants invalides"),
    });
  };

  return (
    <AuthLayout>
      <Head title="Connexion" />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Connexion
          </h1>

          <form onSubmit={submit} className="space-y-5">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                error={!!errors.email}
              />
              <InputError message={errors.email} />
            </div>

            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={data.password}
                onChange={(e) => setData("password", e.target.value)}
                error={!!errors.password}
              />
              <InputError message={errors.password} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox
                  id="remember"
                  checked={data.remember}
                  onChange={(e) => setData("remember", e.target.checked)}
                />
                <Label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                  Se souvenir de moi
                </Label>
              </div>

              {canResetPassword && (
                <TextLink href="/forgot-password" className="text-sm">
                  Mot de passe oublié ?
                </TextLink>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={processing}>
              {processing ? "Connexion…" : "Se connecter"}
            </Button>

            <p className="text-center text-sm text-gray-500">
              Pas de compte ? <TextLink href="/register">S’inscrire</TextLink>
            </p>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}
