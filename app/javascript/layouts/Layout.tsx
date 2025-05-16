import Navbar from "../components/navbar/Navbar";
import HomeButton from "../components/navbar/HomeButton";
import UserActions from "../components/navbar/UserActions";
import { PageProps } from "@customTypes/usepage-props.types";
import ThemeSelector from "../components/theme/ThemeSelector";
import { Footer } from "@components/ui";
import { useToast } from "../contexts/ToastProvider";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";

export function Layout({ children }: { children: React.ReactNode }) {
  const { flash } = usePage<PageProps>().props;
  const { showToast } = useToast();

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

  return (
    <>
      <div className="flex flex-col min-h-screen bg-neutral-50">
        <header className="sticky top-0 z-10 bg-white shadow-sm border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16 gap-2">
              <HomeButton className="me-6" />
              <Navbar />
              <UserActions />
              <ThemeSelector />
            </div>
          </div>
        </header>

        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
            {children}
          </div>
        </main>

        <Footer></Footer>
      </div>
    </>
  );
}
