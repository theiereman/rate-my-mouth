import { Button } from "@components/ui";
import { router } from "@inertiajs/react";

export interface PagyMetadata {
  first_url: string;
  prev_url: string;
  next_url: string;
  last_url: string;
  next: number | null;
  prev: number | null;
  last: number | null;
  count: number;
  page: number;
  pages: number;
  limit: number;
}

export function Pagination({
  pagy,
  className = "",
}: {
  pagy?: PagyMetadata;
  className?: string;
}) {
  const handleNextClick = () => {
    console.log("Next URL:", pagy?.next_url);
    router.visit(pagy?.next_url ?? "#", {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handlePrevClick = () => {
    router.visit(pagy?.prev_url ?? "#", {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleFirstClick = () => {
    router.visit(pagy?.first_url ?? "#", {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleLastClick = () => {
    router.visit(pagy?.last_url ?? "#", {
      preserveState: true,
      preserveScroll: true,
    });
  };

  return CustomPagination({
    pagy,
    className,
    onNextClick: handleNextClick,
    onPrevClick: handlePrevClick,
    onFirstClick: handleFirstClick,
    onLastClick: handleLastClick,
  });
}

export function CustomPagination({
  pagy,
  className,
  onNextClick,
  onPrevClick,
  onFirstClick,
  onLastClick,
}: {
  pagy?: PagyMetadata;
  className?: string;
  onNextClick?: () => void;
  onPrevClick?: () => void;
  onFirstClick?: () => void;
  onLastClick?: () => void;
}) {
  return (
    (pagy?.pages ?? 0) > 1 && (
      <div className={`flex gap-2 justify-center items-center ${className}`}>
        <Button disabled={pagy?.prev === null} onClick={onFirstClick}>
          <span className="material-symbols-outlined">first_page</span>
        </Button>
        <Button disabled={pagy?.prev === null} onClick={onPrevClick}>
          <span className="material-symbols-outlined">keyboard_arrow_left</span>
        </Button>
        <span className="text-neutral-500">
          {pagy?.page} / {pagy?.pages}
        </span>

        <Button onClick={onNextClick} disabled={pagy?.next === null}>
          <span className="material-symbols-outlined">
            keyboard_arrow_right
          </span>
        </Button>
        <Button onClick={onLastClick} disabled={pagy?.next === null}>
          <span className="material-symbols-outlined">last_page</span>
        </Button>
      </div>
    )
  );
}
