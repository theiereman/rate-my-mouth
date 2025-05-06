import { parseInt } from "lodash";
import {
  themeColorsFromHue,
  ThemeColors,
  useTheme,
} from "../../contexts/ThemeContext";

export default function CustomThemeSelector({
  onColorChange,
}: {
  onColorChange?: (colors: ThemeColors) => void;
}) {
  const { currentTheme, setCustomTheme } = useTheme();

  const handleColorChange = (value: string) => {
    const colors = themeColorsFromHue(parseInt(value));
    setCustomTheme(colors);
    onColorChange && onColorChange(colors);
  };

  return (
    <div>
      <div className="mb-1">
        <h3 className="text-xs font-medium text-neutral-700">
          Couleurs personnalisées
        </h3>
        <input
          type="range"
          min="0"
          max="360"
          value={currentTheme.colors.primary}
          onChange={(e) => {
            handleColorChange(e.target.value);
          }}
          className="flex-1 accent-primary-600 w-full"
        />
      </div>
      <div className="flex h-3 gap-1">
        <CustomColor color={currentTheme.colors.primary} />
        <CustomColor color={currentTheme.colors.secondary} />
        <CustomColor color={currentTheme.colors.accent} />
      </div>
    </div>
  );
}

function CustomColor({ color }: { color: string }) {
  return (
    <div
      className="rounded-sm flex-1"
      style={{
        backgroundColor: `oklch(0.75 0.2 ${color})`,
      }}
    ></div>
  );
}
