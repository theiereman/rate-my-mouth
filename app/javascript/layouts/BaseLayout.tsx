import { PageProps } from "@customTypes/usepage-props.types";
import { Footer } from "@components/ui";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import axios from "axios";
import Logo from "@components/ui/Logo";
import { useToast } from "@contexts/ToastProvider";

export function BaseLayout({ children }: { children: React.ReactNode }) {
  const { flash } = usePage<PageProps>().props;
  const { showToast } = useToast();
  const { csrf_token } = usePage().props; // to make basic axios requests work

  useEffect(() => {
    // Check for different types of flash messages
    if (flash.alert) {
      showToast(flash.alert, { type: "error" });
    } else if (flash.success) {
      showToast(flash.success, { type: "success" });
    } else if (flash.info) {
      showToast(flash.info, { type: "info" });
    } else if (flash.warning) {
      showToast(flash.warning, { type: "warning" });
    } else if (flash.notice) {
      showToast(flash.notice, { type: "success" });
    }
  }, [flash]);

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
