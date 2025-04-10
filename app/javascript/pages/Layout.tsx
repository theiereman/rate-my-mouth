import { usePage } from "@inertiajs/react";
import Navbar from "../components/Navbar";
import HomeButton from "../components/HomeButton";
import UserActions from "../components/UserActions";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { flash } = usePage().props;

  return (
    <main>
      <header className="flex justify-between items-center p-4 bg-gray-200">
        <HomeButton />
        <Navbar />
        <UserActions />
      </header>
      <main className="mx-auto md:w-2/3 w-full px-8 pt-8">
        {flash.alert && <div className="alert">{flash.alert}</div>}
        {flash.notice && <div className="notice">{flash.notice}</div>}
        {children}
      </main>
      <footer></footer>
    </main>
  );
}
