import { Section } from "@components/ui";

export default function RecipeCategoryContainer({
  title,
  children,
}: {
  title?: string;
  children?: React.ReactNode;
}) {
  return title ? (
    <Section variant="ghost" title={title}>
      {children}
    </Section>
  ) : (
    children
  );
}
