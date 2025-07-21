import { LinkButton } from "@components/ui";
import Logo from "@components/ui/Logo";

export default function Home() {
  return (
    <div className="text-primary-900 relative z-10 flex min-h-screen flex-col justify-between overflow-hidden px-4 pb-4 lg:flex-row">
      <div>
        <h1 className="text-8xl font-black lg:text-[164px]/40">
          RATE<br></br>MY<br></br>MOUTH
        </h1>
        <h2 className="text-4xl font-light uppercase lg:text-6xl">
          Transformez vos <br />
          recettes en XP
        </h2>
      </div>
      <div className="mt-12 flex flex-col items-end gap-2 lg:mt-6 lg:items-end">
        <LinkButton
          className="w-76 text-2xl max-sm:w-full"
          href={"/users/sign_in"}
        >
          Se connecter
        </LinkButton>
        <LinkButton
          className="w-76 text-2xl max-sm:w-full"
          href={"/users/sign_up"}
        >
          S'inscrire
        </LinkButton>
      </div>
      <Logo className="pointer-events-none absolute -right-1/8 -bottom-1/5 -z-10 size-9/10 rotate-20 fill-current opacity-5" />
    </div>
  );
}
