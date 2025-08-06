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
  pagination,
  className = "",
}: {
  pagination?: PagyMetadata;
  className?: string;
}) {
  const handleNextClick = () => {
    console.log("Next URL:", pagination?.next_url);
    router.visit(pagination?.next_url ?? "#", {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handlePrevClick = () => {
    router.visit(pagination?.prev_url ?? "#", {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleFirstClick = () => {
    router.visit(pagination?.first_url ?? "#", {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleLastClick = () => {
    router.visit(pagination?.last_url ?? "#", {
      preserveState: true,
      preserveScroll: true,
    });
  };

  return CustomPagination({
    pagination,
    className,
    onNextClick: handleNextClick,
    onPrevClick: handlePrevClick,
    onFirstClick: handleFirstClick,
    onLastClick: handleLastClick,
  });
}

export function CustomPagination({
  pagination,
  className,
  onNextClick,
  onPrevClick,
  onFirstClick,
  onLastClick,
}: {
  pagination?: PagyMetadata;
  className?: string;
  onNextClick?: () => void;
  onPrevClick?: () => void;
  onFirstClick?: () => void;
  onLastClick?: () => void;
}) {
  return (
    (pagination?.pages ?? 0) > 1 && (
      <div className={`flex items-center justify-center gap-2 ${className}`}>
        <Button disabled={pagination?.prev === null} onClick={onFirstClick}>
          <span className="material-symbols-outlined">first_page</span>
        </Button>
        <Button disabled={pagination?.prev === null} onClick={onPrevClick}>
          <span className="material-symbols-outlined">keyboard_arrow_left</span>
        </Button>
        <span className="text-neutral-500">
          {pagination?.page} / {pagination?.pages}
        </span>

        <Button onClick={onNextClick} disabled={pagination?.next === null}>
          <span className="material-symbols-outlined">
            keyboard_arrow_right
          </span>
        </Button>
        <Button onClick={onLastClick} disabled={pagination?.next === null}>
          <span className="material-symbols-outlined">last_page</span>
        </Button>
      </div>
    )
  );
}
