import { useEffect, useState } from "react";
import { Head, useForm, router } from "@inertiajs/react";
import InputError from "@/components/input-error";
import TextLink from "@/components/text-link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import SuccessModal from "@/components/ui/SuccessModal";
import AuthLayout from "@/layouts/auth-layout";

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [modal, setModal] = useState({ open: false, message: "" });

  useEffect(() => reset("password", "password_confirmation"), []);

  useEffect(() => {
    if (modal.open) {
      const timer = setTimeout(() => router.visit("/blog"), 1000);
      return () => clearTimeout(timer);
    }
  }, [modal.open]);

  const submit = (e) => {
    e.preventDefault();
    post("/register", {
      onSuccess: () => setModal({ open: true, message: "Compte créé !" }),
      onError: () => setModal({ open: true, message: "Échec de création." }),
    });
  };

  return (
    <AuthLayout>
      <Head title="Inscription" />
      <SuccessModal open={modal.open} message={modal.message} redirectTo="/blog" />

      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Créer un compte
          </h1>

          <form onSubmit={submit} className="space-y-5">
            <div>
              <Label htmlFor="name">Nom complet</Label>
              <Input
                id="name"
                type="text"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                error={!!errors.name}
              />
              <InputError message={errors.name} />
            </div>

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

            <div>
              <Label htmlFor="password_confirmation">Confirmer mot de passe</Label>
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
              {processing ? "Création…" : "Créer mon compte"}
            </Button>

            <p className="text-center text-sm text-gray-500">
              Déjà un compte ? <TextLink href="/login">Se connecter</TextLink>
            </p>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}
