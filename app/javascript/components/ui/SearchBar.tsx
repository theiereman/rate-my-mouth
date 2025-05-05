import Input from "./Input";
import { router } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";

export default function SearchBar({
  className = "",
  placeholder = "Rechercher...",
  onLoadingChange,
}: {
  className?: string;
  placeholder?: string;
  onLoadingChange?: (isLoading: boolean) => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoadingState] = useState(false);

  // Fonction wrapper pour mettre à jour l'état de chargement et notifier le parent
  const setIsLoading = (loading: boolean) => {
    setIsLoadingState(loading);
    if (onLoadingChange) {
      onLoadingChange(loading);
    }
  };

  const search = useMemo(
    () =>
      debounce((query: string) => {
        setIsLoading(true);
        router.get(
          "/recipes/search",
          { query },
          {
            preserveState: true,
            onSuccess: () => setIsLoading(false),
            onError: () => setIsLoading(false),
          }
        );
      }, 500),
    []
  );

  useEffect(() => {
    return () => {
      search.cancel();
    };
  }, [search]);

  function handleChange(e: any) {
    const value = e.target.value;
    setSearchQuery(value);
    search(value);
  }

  return (
    <div className={`flex gap-2 ${className}`}>
      <Input
        containerClassName="flex-1"
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleChange}
        rightIcon={
          isLoading ? (
            <span className="material-symbols-outlined text-primary-600">
              progress_activity
            </span>
          ) : undefined
        }
      ></Input>
    </div>
  );
}
