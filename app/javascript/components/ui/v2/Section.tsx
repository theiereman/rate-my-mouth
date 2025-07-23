type SectionVariant = "default" | "ghost";

const getMainContainerClassnames = (variant: SectionVariant) => {
  switch (variant) {
    case "ghost":
      return "bg-transparent";
    case "default":
      return "border-3";
  }
};

const getTitleClassnames = (variant: SectionVariant) => {
  switch (variant) {
    case "ghost":
      return "text-primary-900 mb-2";
    case "default":
      return "text-background bg-primary-900 px-2 py-1";
  }
};

const getChildrenContainerClassnames = (variant: SectionVariant) => {
  switch (variant) {
    case "default":
      return "p-2";
  }
};

export default function Section({
  title,
  headerAction,
  children,
  variant = "default",
  className,
}: {
  title: string;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
  variant?: SectionVariant;
  className?: string;
}) {
  return (
    <div className={`${getMainContainerClassnames(variant)} ${className}`}>
      <div
        className={`${getTitleClassnames(variant)} flex items-center justify-between`}
      >
        <p className={`flex-1 text-xl font-bold uppercase`}>{title}</p>
        {headerAction && <div>{headerAction}</div>}
      </div>
      <div className={`${getChildrenContainerClassnames(variant)}`}>
        {children}
      </div>
    </div>
  );
}
