import { useEffect } from "react";
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

    // ✅ VALIDATION FRONTEND CORRIGÉE
    if (!data.email || !data.password) {
      toast.error("Email et mot de passe requis");
      return;
    } // ✅ ACCOLADE FERMANTE AJOUTÉE

    // ✅ REQUÊTE POST MAINTENANT ACCESSIBLE
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
      }, // ✅ ACCOLADE FERMANTE AJOUTÉE
    });
  };

  return (
    <>
      <Head title="Se connecter" />
      <AuthLayout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
            <h1 className="text-2xl font-bold text-center text-gray-800">
              Connectez-vous à votre compte MAOlogie
            </h1>

            {/* AFFICHAGE STATUS SESSION */}
            {status && (
              <div className="mb-4 font-medium text-sm text-green-600">
                {status}
              </div>
            )}

            <form onSubmit={submit} className="space-y-5">
              <div>
                <Label htmlFor="email" value="Adresse email" />
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={data.email}
                  className="mt-1 block w-full"
                  autoComplete="username"
                  isFocused={true}
                  onChange={(e) => setData("email", e.target.value)}
                  error={!!errors.email}
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
                  error={!!errors.password}
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

                <Button
                  className="ml-4"
                  disabled={processing}
                  type="submit"
                >
                  {processing ? "Connexion..." : "Se connecter"}
                </Button>
              </div>
            </form>

            {/* SECTION DEBUG TEMPORAIRE */}
            <div className="mt-8 p-4 bg-yellow-50 rounded-md">
              <h3 className="text-sm font-medium text-yellow-800">
                🧪 Comptes de test disponibles
              </h3>
              <div className="mt-2 text-xs text-yellow-700 space-y-1">
                <div>👤 Admin: admin@maologie.fr / password</div>
                <div>👤 User: user@maologie.fr / password</div>
                <div className="pt-2 text-gray-600">
                  📝 Assurez-vous que les seeders sont exécutés
                </div>
              </div>
            </div>
          </div>
        </div>
      </AuthLayout>
    </>
  );
}
