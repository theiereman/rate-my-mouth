import { Footer } from "@components/ui";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import axios from "axios";
import Logo from "@components/ui/Logo";

export function BaseLayout({ children }: { children: React.ReactNode }) {
  const { csrf_token } = usePage().props; // to make basic axios requests work

  useEffect(() => {
    if (typeof csrf_token === "string" && csrf_token.length > 0) {
      axios.defaults.headers.common["X-CSRF-Token"] = csrf_token;
    }
  }, [csrf_token]);

  return (
    <>
      <div className="flex h-full flex-col">
        <div className="pointer-events-none fixed top-0 left-0 flex h-dvh w-screen flex-col items-stretch overflow-hidden">
          <Logo className="absolute -right-1/8 -bottom-1/5 size-9/10 rotate-10 fill-current opacity-3" />
        </div>
        <div className="z-10 flex-1">{children}</div>
        <Footer />
      </div>
    </>
  );
}
