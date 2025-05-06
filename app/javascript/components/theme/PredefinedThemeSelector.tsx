import {
  themeColorsFromHue,
  predefinedThemes,
  ThemeColors,
  useTheme,
} from "../../contexts/ThemeContext";

export default function PredefinedThemeSelector({
  onColorChange,
}: {
  onColorChange?: (colors: ThemeColors) => void;
}) {
  const { currentTheme, setTheme } = useTheme();

  return (
    <div className="grid grid-cols-5 gap-2">
      {predefinedThemes.map((theme) => (
        <button
          key={theme.id}
          onClick={() => {
            const colors = themeColorsFromHue(parseInt(theme.colors.primary));
            onColorChange && onColorChange(colors);
            setTheme(theme);
          }}
          className={`w-full aspect-square rounded-full border-2 transition-all ${
            currentTheme.id === theme.id
              ? "border-neutral-700 scale-110"
              : "border-transparent hover:border-neutral-300"
          }`}
          title={theme.name}
          style={{
            background: `oklch(0.75 0.2 ${theme.colors.primary})`,
          }}
        />
      ))}
    </div>
  );
}
