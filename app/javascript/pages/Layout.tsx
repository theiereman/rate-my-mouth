import { usePage } from "@inertiajs/react";
import Navbar from "../components/navbar/Navbar";
import HomeButton from "../components/navbar/HomeButton";
import UserActions from "../components/navbar/UserActions";

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
        {flash.alert && <div className="text-red-600">{flash.alert}</div>}
        {flash.notice && <div className="text-green-600">{flash.notice}</div>}
        {children}
      </main>
      <footer></footer>
    </main>
  );
}
