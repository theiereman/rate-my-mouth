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
    <div className="relative flex h-screen flex-col items-stretch overflow-hidden">
      <Logo className="pointer-events-none absolute -right-1/8 -bottom-1/5 size-7/10 rotate-10 fill-current opacity-5" />

      <div className="flex h-full flex-col overflow-auto">
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
