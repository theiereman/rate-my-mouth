import { LinkButton } from "@components/ui";

export interface PagyMetadata {
  first_url: string;
  prev_url: string;
  next_url: string;
  last_url: string;
  next: number | null;
  count: number;
  page: number;
  pages: number;
  limit: number;
}

export default function Pagination({
  pagy,
  className,
}: {
  pagy: PagyMetadata;
  className?: string;
}) {
  return (
    <div className={`flex gap-2 justify-center items-center ${className}`}>
      <LinkButton
        preserveState
        className="material-symbols-outlined"
        disabled={pagy.page === 1}
        href={pagy.first_url}
      >
        first_page
      </LinkButton>
      <LinkButton
        preserveState
        className="material-symbols-outlined"
        disabled={pagy.page === 1}
        href={pagy.prev_url}
      >
        keyboard_arrow_left
      </LinkButton>
      <span className="text-neutral-500">
        {pagy.page} / {pagy.pages}
      </span>

      <LinkButton
        preserveState
        className="material-symbols-outlined"
        disabled={pagy.page === pagy.pages}
        href={pagy.next_url}
      >
        keyboard_arrow_right
      </LinkButton>
      <LinkButton
        preserveState
        className="material-symbols-outlined"
        disabled={pagy.page === pagy.pages}
        href={pagy.last_url}
      >
        last_page
      </LinkButton>
    </div>
  );
}
