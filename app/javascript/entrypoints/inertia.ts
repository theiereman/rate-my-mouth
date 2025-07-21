import { createInertiaApp } from "@inertiajs/react";
import { createElement, ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@contexts/ThemeContext";
import { Layout } from "@layouts/Layout";
import { ToastProvider } from "@contexts/ToastProvider";

// Temporary type definition, until @inertiajs/react provides one
type ResolvedComponent = {
  default: ReactNode;
  layout?: (page: ReactNode) => ReactNode;
};

createInertiaApp({
  title: (title) => `Rate My Mouth - ${title}`,
  resolve: (name) => {
    const pages = import.meta.glob<ResolvedComponent>("../pages/**/*.tsx", {
      eager: true,
    });
    const page = pages[`../pages/${name}.tsx`];
    if (!page) {
      console.error(`Missing Inertia page component: '${name}.tsx'`);
    }

    if (page && page.default) {
      (page.default as any).layout ||= (page: ReactNode) =>
        name.startsWith("Public/") ? page : createElement(Layout, null, page);
    }

    return page;
  },

  setup({ el, App, props }) {
    if (el) {
      createRoot(el).render(
        createElement(
          ToastProvider,
          null,
          createElement(ThemeProvider, null, createElement(App, props)),
        ),
      );
    } else {
      console.error(
        "Missing root element.\n\n" +
          "If you see this error, it probably means you load Inertia.js on non-Inertia pages.\n" +
          'Consider moving <%= vite_typescript_tag "inertia" %> to the Inertia-specific layout instead.',
      );
    }
  },
});
