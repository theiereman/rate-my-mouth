import Navbar from "../components/navbar/v2/Navbar";
import { PageProps } from "@customTypes/usepage-props.types";
import { Footer } from "@components/ui";
import { useToast } from "../contexts/ToastProvider";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import axios from "axios";

export function Layout({ children }: { children: React.ReactNode }) {
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
      <div className="bg-background flex min-h-screen flex-col">
        <div className="bg-background sticky top-0 z-10 p-2 px-4">
          <Navbar />
        </div>

        <main className="flex-grow">
          <div className="animate-fade-in mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
