import { useForm, Link } from "@inertiajs/react";
import { FormEvent, useState, useEffect } from "react";
import { Input, Button } from "@components/ui";
import { PageProps } from "@customTypes/usepage-props.types";
import Flashes from "@components/ui/Flashes";

export default function ForgotPassword({ flash }: PageProps) {
  const form = useForm<{
    email: string;
  }>({
    email: "",
  });

  const { data, setData, errors, processing, post } = form;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.transform((data) => ({
      user: data,
    }));
    post("/auth/password");
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

      <Flashes flash={flash} />

      <div className="mt-4 text-sm">
        <Link
          href="/auth/sign_in"
          className="text-primary-600 hover:text-primary-800 hover:underline"
        >
          Retour à la connexion
        </Link>
      </div>
    </div>
  );
}
