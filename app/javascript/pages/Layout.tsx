import { Head, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import HomeButton from "../components/navbar/HomeButton";
import UserActions from "../components/navbar/UserActions";
import { PageProps } from "../types";
import ThemeSelector from "../components/theme/ThemeSelector";
import { Footer, Toast } from "../components";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { flash } = usePage<PageProps>().props;
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<
    "error" | "success" | "info" | "warning"
  >("error");

  useEffect(() => {
    // Check for different types of flash messages
    if (flash.alert) {
      setToastMessage(flash.alert);
      setToastType("error");
      setShowToast(true);
    } else if (flash.success) {
      setToastMessage(flash.success);
      setToastType("success");
      setShowToast(true);
    } else if (flash.info) {
      setToastMessage(flash.info);
      setToastType("info");
      setShowToast(true);
    } else if (flash.warning) {
      setToastMessage(flash.warning);
      setToastType("warning");
      setShowToast(true);
    } else if (flash.notice) {
      setToastMessage(flash.notice);
      setToastType("success");
      setShowToast(true);
    }
  }, [flash.alert, flash.success, flash.info, flash.warning, flash.notice]);

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </Head>

      <div className="flex flex-col min-h-screen bg-neutral-50">
        <header className="sticky top-0 z-10 bg-white shadow-sm border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16 gap-2">
              <HomeButton className="me-6" />
              <Navbar />
              <UserActions />
              <ThemeSelector></ThemeSelector>
            </div>
          </div>
        </header>

        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
            {showToast && (
              <Toast
                message={toastMessage}
                type={toastType}
                onClose={() => setShowToast(false)}
              />
            )}
            {children}
          </div>
        </main>

        <Footer></Footer>
      </div>
    </>
  );
}
