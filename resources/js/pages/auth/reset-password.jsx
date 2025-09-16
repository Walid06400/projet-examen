import { useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import InputError from "@/components/input-error";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import TextLink from "@/components/text-link";
import AuthLayout from "@/layouts/auth-layout";

export default function ResetPassword({ token, email: initialEmail }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    token,
    email: initialEmail || "",
    password: "",
    password_confirmation: "",
  });

  useEffect(() => reset("password", "password_confirmation"), []);

  const submit = (e) => {
    e.preventDefault();
    post("/reset-password", {
      onSuccess: () => alert("Mot de passe réinitialisé !"),
    });
  };

  return (
    <AuthLayout>
      <Head title="Réinitialisation du mot de passe" />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Réinitialiser le mot de passe
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
              <Label htmlFor="password">Nouveau mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={data.password}
                onChange={(e) => setData("password", e.target.value)}
                error={!!errors.password}
              />
              <InputError message={errors.password} />
            </div>

            <div>
              <Label htmlFor="password_confirmation">
                Confirmer le mot de passe
              </Label>
              <Input
                id="password_confirmation"
                type="password"
                value={data.password_confirmation}
                onChange={(e) => setData("password_confirmation", e.target.value)}
                error={!!errors.password_confirmation}
              />
              <InputError message={errors.password_confirmation} />
            </div>

            <Button type="submit" className="w-full" disabled={processing}>
              {processing ? "Réinitialisation…" : "Réinitialiser"}
            </Button>

            <p className="text-center text-sm text-gray-500">
              Retour à <TextLink href="/login">la connexion</TextLink>
            </p>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}
