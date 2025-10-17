import { useForm, Link, usePage } from "@inertiajs/react";
import { FormEvent } from "react";
import { Input, Button } from "@components/ui";
import Flashes from "@components/ui/Flashes";

export default function Login() {
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
    post("/auth/sign_in");
  };

  return (
    <div className="mx-auto flex h-full max-w-sm flex-col justify-center gap-4">
      <div>
        <h1 className="text-4xl font-black">RATE MY MOUTH</h1>
        <h2 className="text-2xl">Se connecter à votre compte</h2>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="">
          <Input
            label="Email"
            type="email"
            value={data.email}
            onChange={(e) => setData("email", e.target.value)}
            error={errors.email}
            autoFocus
            autoComplete="email"
          />
        </div>

        <div className="">
          <Input
            label="Mot de passe"
            type="password"
            value={data.password}
            onChange={(e) => setData("password", e.target.value)}
            error={errors.password}
            autoComplete="current-password"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="remember_me"
            name="remember_me"
            checked={data.remember_me}
            onChange={(e) => setData("remember_me", e.target.checked)}
            className="text-primary-600 focus:ring-primary-500 h-4 w-4 rounded border-neutral-300"
          />
          <label
            htmlFor="remember_me"
            className="ml-2 block text-sm text-neutral-700"
          >
            Se souvenir de moi
          </label>
        </div>

        <Button type="submit" disabled={processing} className="w-full">
          Se connecter
        </Button>
      </form>

      <Flashes flash={flash} />

      <div className="flex flex-col text-sm">
        <Link
          href="/auth/password/new"
          className="text-primary-600 hover:text-primary-800 mr-4 hover:underline"
        >
          Mot de passe oublié ?
        </Link>
        <Link
          href="/auth/sign_up"
          className="text-primary-600 hover:text-primary-800 hover:underline"
        >
          S'inscrire
        </Link>
      </div>
    </div>
  );
}
