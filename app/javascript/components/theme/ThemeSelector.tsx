import CustomThemeSelector from "@components/theme/CustomThemeSelector";
import PredefinedThemeSelector from "@components/theme/PredefinedThemeSelector";

export default function ThemeSelector() {
  return (
    <div className="relative group">
      <button className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center space-x-3 focus:outline-none cursor-pointer transition-transform group-hover:scale-105">
        <span className="material-symbols-outlined text-primary-600">
          color_lens
        </span>
      </button>

      <div className="hidden group-hover:flex absolute right-0 w-64 bg-white rounded-md shadow-lg z-10 py-2 px-4 flex-col gap-2">
        <div id="predefined-colors">
          <h1 className="text-sm font-medium text-neutral-700 mb-2">
            Thème de l'application
          </h1>
          <PredefinedThemeSelector />
        </div>

        <div id="custom-colors">
          <CustomThemeSelector />
        </div>
      </div>
    </div>
  );
}
