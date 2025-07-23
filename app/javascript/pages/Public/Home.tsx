import { LinkButton } from "@components/ui";

export default function Home() {
  return (
    <div className="text-primary-900 relative z-10 flex h-full flex-1 flex-col justify-between overflow-hidden lg:flex-row">
      <div className="flex-1">
        <h1 className="text-7xl font-black lg:text-[164px]/40">
          RATE<br></br>MY<br></br>MOUTH
        </h1>
        <h2 className="text-3xl font-light uppercase lg:text-6xl">
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
    </div>
  );
}
