import CustomThemeSelector from "@components/navbar/dropdowns/theme/CustomThemeSelector";
import PredefinedThemeSelector from "@components/navbar/dropdowns/theme/PredefinedThemeSelector";
import NavbarDropdown from "@components/ui/NavbarDropdown";

export default function ThemeSelector() {
  return (
    <NavbarDropdown
      buttonChildren={
        <span className="material-symbols-outlined text-primary-600">
          color_lens
        </span>
      }
    >
      <div id="predefined-colors">
        <h1 className="text-sm font-medium text-neutral-700 mb-2">
          Thème de l'application
        </h1>
        <PredefinedThemeSelector />
      </div>

      <div id="custom-colors">
        <CustomThemeSelector />
      </div>
    </NavbarDropdown>
  );
}
