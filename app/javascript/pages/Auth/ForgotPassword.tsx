import { useForm, Link } from "@inertiajs/react";
import { FormEvent, useState, useEffect } from "react";
import { Input, Button } from "@components/ui";
import { PageProps } from "@customTypes/usepage-props.types";
import AuthLayout from "@layouts/AuthLayout";

export default function ForgotPassword({ flash }: PageProps) {
  const [showAlert, setShowAlert] = useState(false);
  const [showNotice, setShowNotice] = useState(false);

  const form = useForm<{
    email: string;
  }>({
    email: "",
  });

  const { data, setData, errors, processing, post } = form;

  useEffect(() => {
    if (flash?.alert) {
      setShowAlert(true);
      setShowNotice(false);
    } else if (flash?.notice) {
      setShowNotice(true);
      setShowAlert(false);
    } else {
      setShowAlert(false);
      setShowNotice(false);
    }
  }, [flash?.alert, flash?.notice]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.transform((data) => ({
      user: data,
    }));
    post("/users/password");
  };

  const content = (
    <div className="h-full flex flex-col justify-center items-stretch">
      <h1 className="text-xl font-medium mb-4 text-neutral-800">
        Mot de passe oublié ?
      </h1>

      <p className="text-sm text-neutral-600 mb-6">
        Entrez votre adresse e-mail et nous vous enverrons un lien pour
        réinitialiser votre mot de passe.
      </p>

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

        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={processing}
          isLoading={processing}
        >
          Envoyer le lien
        </Button>
      </form>

      {showAlert && flash?.alert && (
        <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-md">
          {flash.alert}
        </div>
      )}

      {showNotice && flash?.notice && (
        <div className="mt-4 p-3 bg-green-50 text-green-600 text-sm rounded-md">
          {flash.notice}
        </div>
      )}

      <div className="mt-4 text-sm">
        <Link
          href="/users/sign_in"
          className="text-primary-600 hover:text-primary-800 hover:underline"
        >
          Retour à la connexion
        </Link>
      </div>
    </div>
  );

  return <AuthLayout title="Mot de passe oublié">{content}</AuthLayout>;
}

// Define the layout for the forgot password page
ForgotPassword.layout = (page: React.ReactNode) => page;
