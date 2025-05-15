import { useForm, Link } from "@inertiajs/react";
import { FormEvent, useState, useEffect } from "react";
import { Input, Button } from "@components/ui";
import { PageProps } from "@customTypes/usepage-props.types";
import AuthLayout from "@layouts/AuthLayout";

export default function Login({ flash }: PageProps) {
  const [showAlert, setShowAlert] = useState(false);

  const form = useForm<{
    email: string;
    password: string;
    remember_me: boolean;
  }>({
    email: "",
    password: "",
    remember_me: false,
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
    post("/users/sign_in");
  };

  const content = (
    <div className="h-full flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold m-10 text-primary-600">
        Rate My Mouth
      </h1>
      <div className="w-[400px] border border-neutral-200 bg-neutral-50 p-5 rounded-lg shadow-sm">
        <h1 className="text-center text-xl font-medium mb-4 text-neutral-800">
          Identifiez-vous
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              label="Email"
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
              label="Mot de passe"
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
              error={errors.password}
              autoComplete="current-password"
            />
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="remember_me"
              name="remember_me"
              checked={data.remember_me}
              onChange={(e) => setData("remember_me", e.target.checked)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
            />
            <label
              htmlFor="remember_me"
              className="ml-2 block text-sm text-neutral-700"
            >
              Se souvenir de moi
            </label>
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={processing}
            isLoading={processing}
          >
            Se connecter
          </Button>
        </form>

        {showAlert && flash?.alert && (
          <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-md">
            {flash.alert}
          </div>
        )}

        <div className="mt-4 text-sm">
          <Link
            href="/users/sign_up"
            className="text-primary-600 hover:text-primary-800 hover:underline"
          >
            S'inscrire
          </Link>
        </div>
      </div>
    </div>
  );

  return <AuthLayout title="Connexion">{content}</AuthLayout>;
}

// Define the layout for the login page
Login.layout = (page: React.ReactNode) => page;
