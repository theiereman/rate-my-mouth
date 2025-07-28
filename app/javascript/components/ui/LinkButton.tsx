import { router } from "@inertiajs/react";
import { Button, ButtonProps } from "@components/ui";
import type { FormDataConvertible, Method } from "@inertiajs/core";

type LinkButtonProps = {
  href: string;
  method?: Method;
  data?: Record<string, FormDataConvertible> | undefined;
  onBefore?: () => void;
  onSuccess?: () => void;
  children: React.ReactNode;
  isLoading?: boolean;
} & Omit<ButtonProps, "onClick">;

const handleLinkClick = ({
  href,
  method = "get",
  data = {},
  onBefore,
  onSuccess,
}: LinkButtonProps) => {
  router.visit(href, {
    method,
    replace: method === "delete",
    data: data,
    preserveScroll: true,
    preserveState: true,
    onSuccess: onSuccess,
    onBefore: onBefore,
  });
};

export default function LinkButton(props: LinkButtonProps) {
  return (
    <Button
      {...props}
      disabled={props.isLoading || props.disabled}
      onClick={() => handleLinkClick(props)}
    >
      {props.children}
    </Button>
  );
}
