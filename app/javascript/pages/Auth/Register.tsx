import { useForm, Link } from "@inertiajs/react";
import { FormEvent, useState, useEffect } from "react";
import { Input, Button } from "../../components";
import { PageProps } from "../../types";
import { RegisterFormData } from "./types";
import AuthLayout from "./AuthLayout";

export default function Register({ flash }: PageProps) {
  const [showAlert, setShowAlert] = useState(false);
  const [minimumPasswordLength, setMinimumPasswordLength] = useState(6);

  const form = useForm<RegisterFormData>({
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
  });

  const { data, setData, errors, processing, post } = form;

  useEffect(() => {
    if (flash?.alert) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [flash?.alert]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.transform((data) => ({
      user: data,
    }));
    post("/users");
  };

  const content = (
    <div className="h-full flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold m-10 text-primary-600">
        Rate My Mouth
      </h1>
      <div className="w-[400px] border border-neutral-200 bg-neutral-50 p-5 rounded-lg shadow-sm">
        <h1 className="text-center text-xl font-medium mb-4 text-neutral-800">
          Créer un compte
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              label="E-mail"
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
              error={errors.email}
              autoFocus
              autoComplete="email"
            />
          </div>

          <div className="mb-4">
            <Input
              label="Nom d'utilisateur"
              type="text"
              id="username"
              name="username"
              value={data.username}
              onChange={(e) => setData("username", e.target.value)}
              error={errors.username}
              autoComplete="username"
            />
          </div>

          <div className="mb-4">
            <Input
              label={`Mot de passe (${minimumPasswordLength} caractères minimum)`}
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
              error={errors.password}
              autoComplete="new-password"
            />
          </div>

          <div className="mb-6">
            <Input
              label="Confirmation de mot de passe"
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              value={data.password_confirmation}
              onChange={(e) => setData("password_confirmation", e.target.value)}
              error={errors.password_confirmation}
              autoComplete="new-password"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={processing}
            isLoading={processing}
          >
            S'inscrire
          </Button>
        </form>

        {showAlert && flash?.alert && (
          <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-md">
            {flash.alert}
          </div>
        )}

        <div className="mt-4 text-sm">
          <Link
            href="/users/sign_in"
            className="text-primary-600 hover:text-primary-800 hover:underline"
          >
            Déjà un compte ? Se connecter
          </Link>
        </div>
      </div>
    </div>
  );

  return <AuthLayout title="Inscription">{content}</AuthLayout>;
}

// Define the layout for the register page
Register.layout = (page: React.ReactNode) => page;
