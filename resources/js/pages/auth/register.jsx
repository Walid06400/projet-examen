import React from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";

import InputError from "@/components/input-error";
import TextLink from "@/components/text-link";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Label from "@/components/Label";
import AuthLayout from "@/layouts/auth-layout";

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const submit = (e) => {
    e.preventDefault();
    post(route("register"), {
      onFinish: () => reset("password", "password_confirmation"),
    });
  };

  return (
    <AuthLayout
      title="Créer un compte"
      description="Entrez vos informations pour créer votre compte"
    >
      <Head title="Inscription" />
   
      <form className="flex flex-col gap-6" onSubmit={submit}>
        <div className="grid gap-6 text-black">
          <div className="grid gap-2">
            <Label htmlFor="name">Nom</Label>
            <Input
              id="name"
              type="text"
              required
              autoFocus
              tabIndex={1}
              autoComplete="name"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              disabled={processing}
              placeholder="Nom complet"
            />
            <InputError message={errors.name} className="mt-2" />
          </div>

          <div className="grid gap-2 text-black">
            <Label htmlFor="email">Adresse email</Label>
            <Input
              id="email"
              type="email"
              required
              tabIndex={2}
              autoComplete="email"
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
              disabled={processing}
              placeholder="email@example.com"
            />
            <InputError message={errors.email} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              required
              tabIndex={3}
              autoComplete="new-password"
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
              disabled={processing}
              placeholder="Mot de passe"
            />
            <InputError message={errors.password} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password_confirmation">Confirmer le mot de passe</Label>
            <Input
              id="password_confirmation"
              type="password"
              required
              tabIndex={4}
              autoComplete="new-password"
              value={data.password_confirmation}
              onChange={(e) => setData("password_confirmation", e.target.value)}
              disabled={processing}
              placeholder="Confirmer le mot de passe"
            />
            <InputError message={errors.password_confirmation} />
          </div>

          <Button
            type="submit"
            className="mt-2 w-full"
            tabIndex={5}
            disabled={processing}
          >
            {processing && (
              <LoaderCircle className="h-4 w-4 animate-spin mr-1 inline" />
            )}
            Créer le compte
          </Button>
        </div>

        <div className="text-muted-foreground text-center text-sm">
          Vous avez déjà un compte ?{" "}
          <TextLink href={route("login")} tabIndex={6}>
            Se connecter
          </TextLink>
        </div>
      </form>
         {/* Bouton retour à l'accueil */}
    <div className="text-center mt-4">
  <Link
    href="/"
    className="inline-flex items-center mb-4 text-indigo-600 hover:underline font-medium transition"
    tabIndex={0}
  >
    Retour à l'accueil
  </Link>
</div>
    </AuthLayout>
  );
}
