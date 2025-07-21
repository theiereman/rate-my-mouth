import { InertiaLinkProps, router } from "@inertiajs/react";
import { Button, ButtonProps } from "@components/ui";
import type { Method } from "@inertiajs/core";

type LinkButtonProps = InertiaLinkProps & ButtonProps;

const handleLinkClick = (href: string, method: Method) => {
  console.log(`Navigating to ${href} with method ${method}`);
  router.visit(href, {
    method,
  });
};

export default function LinkButton(props: LinkButtonProps) {
  return (
    <Button
      {...props}
      onClick={() =>
        handleLinkClick(props.href as string, props.method as Method)
      }
    >
      {props.children}
    </Button>
  );
}
