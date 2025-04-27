import { usePage } from "@inertiajs/react";
import { PageProps } from "../types";
import ProfilePicPlaceholder from "./ProfilePicPlaceholder";

export default function UserActions() {
  const { user } = usePage<PageProps>().props;

  const handleLogout = () => {
    // Créer un formulaire temporaire pour soumettre une requête DELETE
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "/users/sign_out";

    // Ajouter le token CSRF
    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      ?.getAttribute("content");
    if (csrfToken) {
      const csrfInput = document.createElement("input");
      csrfInput.type = "hidden";
      csrfInput.name = "authenticity_token";
      csrfInput.value = csrfToken;
      form.appendChild(csrfInput);
    }

    // Ajouter le champ _method pour simuler DELETE
    const methodInput = document.createElement("input");
    methodInput.type = "hidden";
    methodInput.name = "_method";
    methodInput.value = "delete";
    form.appendChild(methodInput);

    // Soumettre le formulaire
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  return (
    <div className="flex gap-2 items-center">
      <div className="flex flex-col text-sm items-end">
        <span>{user.email}</span>
        <button
          className="text-xs text-blue-500 hover:underline hover:cursor-pointer"
          onClick={handleLogout}
        >
          Se déconnecter
        </button>
      </div>
      <ProfilePicPlaceholder />
    </div>
  );
}
