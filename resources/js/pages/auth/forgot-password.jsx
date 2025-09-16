import { useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import InputError from "@/components/input-error";
import TextLink from "@/components/text-link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import AuthLayout from "@/layouts/auth-layout";

export default function ForgotPassword() {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
  });

  useEffect(() => reset(), []);

  const submit = (e) => {
    e.preventDefault();
    post("/forgot-password", {
      onSuccess: () => alert("Lien de réinitialisation envoyé !"),
    });
  };

  return (
    <AuthLayout>
      <Head title="Mot de passe oublié" />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Mot de passe oublié
          </h1>

          <p className="text-sm text-gray-600 text-center">
            Entrez votre email pour recevoir un lien de réinitialisation
          </p>

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

            <Button type="submit" className="w-full" disabled={processing}>
              {processing ? "Envoi…" : "Envoyer le lien"}
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
