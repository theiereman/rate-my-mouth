import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define theme types
export type ThemeColors = {
  primary: string;
  secondary: string;
  accent: string;
};

export type ThemeOption = {
  id: string;
  name: string;
  colors: ThemeColors;
};

// Fonction pour calculer une triade de couleurs
export const calculateTriad = (baseHue: number): ThemeColors => {
  // Convertir en nombre si c'est une chaîne
  const hue = typeof baseHue === "string" ? parseInt(baseHue, 10) : baseHue;

  // Calculer les autres couleurs de la triade (à 120° et 240° de la couleur de base)
  const secondaryHue = (hue + 120) % 360;
  const accentHue = (hue + 240) % 360;

  return {
    primary: hue.toString(),
    secondary: secondaryHue.toString(),
    accent: accentHue.toString(),
  };
};

// Predefined themes
export const predefinedThemes: ThemeOption[] = [
  {
    id: "default",
    name: "Défaut",
    colors: calculateTriad(260), // Bleu comme couleur de base
  },
  {
    id: "ocean",
    name: "Océan",
    colors: calculateTriad(195), // Bleu-vert comme couleur de base
  },
  {
    id: "sunset",
    name: "Coucher de soleil",
    colors: calculateTriad(20), // Orange comme couleur de base
  },
  {
    id: "forest",
    name: "Forêt",
    colors: calculateTriad(140), // Vert comme couleur de base
  },
  {
    id: "berry",
    name: "Baies",
    colors: calculateTriad(320), // Rose comme couleur de base
  },
];

// Context type
type ThemeContextType = {
  currentTheme: ThemeOption;
  setTheme: (theme: ThemeOption) => void;
  customTheme: ThemeColors | null;
  setCustomTheme: (colors: ThemeColors) => void;
  applyCustomTheme: () => void;
};

// Create context with default values
const ThemeContext = createContext<ThemeContextType>({
  currentTheme: predefinedThemes[0],
  setTheme: () => {},
  customTheme: null,
  setCustomTheme: () => {},
  applyCustomTheme: () => {},
});

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

// Provider component
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Initialize theme from localStorage or use default
  const [currentTheme, setCurrentTheme] = useState<ThemeOption>(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      try {
        return JSON.parse(savedTheme);
      } catch (e) {
        return predefinedThemes[0];
      }
    }
    return predefinedThemes[0];
  });

  // State for custom theme
  const [customTheme, setCustomTheme] = useState<ThemeColors | null>(null);

  // Apply theme to CSS variables
  useEffect(() => {
    const root = document.documentElement;
    const colors = currentTheme.colors;

    // Apply theme colors to CSS variables
    for (const [key, value] of Object.entries(colors)) {
      // Set all shades for each color
      root.style.setProperty(`--${key}-hue`, value);

      // We keep the same lightness and chroma values from the original theme
      // Just changing the hue value
    }

    // Save theme to localStorage
    localStorage.setItem("theme", JSON.stringify(currentTheme));
  }, [currentTheme]);

  // Set theme function
  const setTheme = (theme: ThemeOption) => {
    setCurrentTheme(theme);
  };

  // Apply custom theme
  const applyCustomTheme = () => {
    if (customTheme) {
      const newTheme: ThemeOption = {
        id: "custom",
        name: "Personnalisé",
        colors: customTheme,
      };
      setCurrentTheme(newTheme);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setTheme,
        customTheme,
        setCustomTheme,
        applyCustomTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
