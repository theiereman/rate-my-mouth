import { LinkButton } from "@components/ui";

export default function ErrorPage({ status }: { status: string }) {
  const description = {
    503: "Le serveur est en maintenance",
    500: "Une erreur est survenue sur nos serveurs",
    404: "La page recherchée est introuvable",
    403: "Accès non-autorisé à cette page",
  }[status];

  return (
    <div className="">
      <h1 className="mb-4 text-7xl font-bold uppercase">Erreur {status}</h1>
      <div className="mb-4 pb-12 text-3xl uppercase">{description}</div>
      <LinkButton href="/">Retour à la civilisation</LinkButton>
    </div>
  );
}
