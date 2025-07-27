import { useForm, Link } from "@inertiajs/react";
import { FormEvent, useState, useEffect } from "react";
import { Input, Button } from "@components/ui";
import { PageProps } from "@customTypes/usepage-props.types";

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

  return (
    <div className="mx-auto flex h-full max-w-sm flex-col justify-center gap-4">
      <div>
        <h1 className="text-4xl font-black">RATE MY MOUTH</h1>
        <h2 className="text-2xl">Mot de passe oublié ?</h2>
      </div>

      <p className="text-primary-900 justify text-sm">
        Entrez votre adresse e-mail et nous vous enverrons un lien pour
        réinitialiser votre mot de passe.
      </p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
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

        <Button type="submit" className="w-full" disabled={processing}>
          Envoyer le lien
        </Button>
      </form>

      {showAlert && flash?.alert && (
        <div className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
          {flash.alert}
        </div>
      )}

      {showNotice && flash?.notice && (
        <div className="mt-4 rounded-md bg-green-50 p-3 text-sm text-green-600">
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
}
