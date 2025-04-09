import { usePage } from "@inertiajs/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { flash } = usePage().props;

  return (
    <main>
      <header></header>
      <article>
        {flash.alert && <div className="alert">{flash.alert}</div>}
        {flash.notice && <div className="notice">{flash.notice}</div>}
        {children}
      </article>
      <footer></footer>
    </main>
  );
}
