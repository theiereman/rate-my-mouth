import { useForm, Link, usePage } from "@inertiajs/react";
import { FormEvent } from "react";
import { Input, Button } from "@components/ui";
import Flashes from "@components/ui/Flashes";

export default function Register() {
  const form = useForm<{
    email: string;
    username: string;
    password: string;
    password_confirmation: string;
  }>({
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
  });

  const { data, setData, errors, processing, post } = form;

  console.log(errors);

  const { flash } = usePage<{
    flash: {
      alert?: string;
      notice?: string;
    };
  }>().props;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.transform((data) => ({
      user: data,
    }));
    post("/users");
  };

  return (
    <div className="mx-auto flex h-full max-w-sm flex-col justify-center gap-4">
      <div>
        <h1 className="text-4xl font-black">RATE MY MOUTH</h1>
        <h2 className="text-2xl">Créer un nouveau compte</h2>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
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

        <div>
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

        <div>
          <Input
            label={`Mot de passe (6 caractères minimum)`}
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={(e) => setData("password", e.target.value)}
            error={errors.password}
            autoComplete="new-password"
          />
        </div>

        <div>
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

        <Button type="submit" className="w-full" disabled={processing}>
          S'inscrire
        </Button>
      </form>

      <Flashes flash={flash} />

      <div className="text-sm">
        <Link
          href="/users/sign_in"
          className="text-primary-600 hover:text-primary-800 hover:underline"
        >
          Déjà un compte ? Se connecter
        </Link>
      </div>
    </div>
  );
}
