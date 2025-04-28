import { usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import HomeButton from "../components/navbar/HomeButton";
import UserActions from "../components/navbar/UserActions";
import Toast from "../components/Toast";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { flash } = usePage().props;
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (flash.alert) {
      setShowToast(true);
    }
  }, [flash.alert]);

  return (
    <main>
      <header className="flex justify-between items-center p-4 bg-gray-200">
        <HomeButton />
        <Navbar />
        <UserActions />
      </header>
      <main className="mx-auto md:w-2/3 w-full px-8 pt-8">
        {showToast && flash.alert && (
          <Toast
            message={flash.alert}
            type="error"
            onClose={() => setShowToast(false)}
          />
        )}
        {children}
      </main>
      <footer></footer>
    </main>
  );
}
