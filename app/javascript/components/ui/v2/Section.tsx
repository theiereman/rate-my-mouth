type SectionVariant = "default" | "no-padding" | "ghost";

const getMainContainerClassnames = (variant: SectionVariant) => {
  switch (variant) {
    case "ghost":
      return "bg-transparent";
    case "default":
    case "no-padding":
      return "border-3";
  }
};

const getTitleClassnames = (variant: SectionVariant) => {
  switch (variant) {
    case "ghost":
      return "text-primary-900 mb-2";
    case "default":
    case "no-padding":
      return "text-background bg-primary-900 px-2 py-1";
  }
};

const getChildrenContainerClassnames = (variant: SectionVariant) => {
  switch (variant) {
    case "default":
      return "p-2";
    case "no-padding":
    case "default":
      return "bg-background";
  }
};

export default function Section({
  title,
  headerAction,
  children,
  variant = "default",
  className,
}: {
  title?: string;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
  variant?: SectionVariant;
  className?: string;
}) {
  return (
    <div className={`${getMainContainerClassnames(variant)} ${className}`}>
      {title && (
        <div
          className={`${getTitleClassnames(variant)} flex items-center justify-between gap-2`}
        >
          <h2 className={`text-xl font-bold whitespace-nowrap uppercase`}>
            {title}
          </h2>
          <div className="bg-primary-900 h-1.5 w-full flex-1" />
          {headerAction}
        </div>
      )}
      <div className={`${getChildrenContainerClassnames(variant)}`}>
        {children}
      </div>
    </div>
  );
}
