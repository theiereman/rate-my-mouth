import { InertiaLinkProps, router } from "@inertiajs/react";
import { Button, ButtonProps } from "@components/ui";
import type { Method } from "@inertiajs/core";

type LinkButtonProps = {
  href: string;
  method: Method;
  onBefore?: () => boolean;
  children: React.ReactNode;
} & Omit<ButtonProps, "onClick">;

const handleLinkClick = (
  href: string,
  method: Method,
  onBefore?: () => boolean,
) => {
  if (onBefore && !onBefore()) {
    return;
  }

  router.visit(href, {
    method,
    replace: method === "delete",
  });
};

export default function LinkButton(props: LinkButtonProps) {
  return (
    <Button
      {...props}
      onClick={() =>
        handleLinkClick(
          props.href as string,
          props.method as Method,
          props.onBefore,
        )
      }
    >
      {props.children}
    </Button>
  );
}
