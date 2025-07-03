import Navbar from "../components/navbar/Navbar";
import HomeButton from "../components/navbar/HomeButton";
import UserActions from "../components/navbar/UserActions";
import { PageProps } from "@customTypes/usepage-props.types";
import ThemeSelector from "../components/theme/ThemeSelector";
import { Footer } from "@components/ui";
import { useToast } from "../contexts/ToastProvider";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import UserNotifications from "@components/navbar/UserNotifications";
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
      <div className="flex flex-col min-h-screen bg-background">
        <header className="sticky top-0 z-50 bg-background shadow-xs">
          <div className="flex items-center h-16 gap-2 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <HomeButton className="me-6" />
            <Navbar />
            <ThemeSelector />
            <UserNotifications />
            <UserActions />
          </div>
        </header>

        <main className="flex-grow">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
            {children}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
