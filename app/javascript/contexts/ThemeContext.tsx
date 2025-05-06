import {
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
  valid?: string;
  error?: string;
  warning?: string;
};

export type ThemeOption = {
  id: string;
  name: string;
  colors: ThemeColors;
};

export const themeColorsFromHue = (baseHue: number): ThemeColors => {
  // Convertir en nombre si c'est une chaîne
  const hue = typeof baseHue === "string" ? parseInt(baseHue, 10) : baseHue;

  // Calculer les autres couleurs de la triade (à 120° et 240° de la couleur de base)
  const secondaryHue = (hue + 120) % 360;
  const accentHue = (hue + 240) % 360;

  // Calculer des variations légères pour les couleurs sémantiques
  // Nous gardons les couleurs proches de leurs valeurs par défaut mais avec une légère influence du thème
  const validHue = (140 + (hue % 30) - 15) % 360; // Variation de ±15° autour de 140° (vert)
  const errorHue = (20 + (hue % 20) - 10) % 360; // Variation de ±10° autour de 20° (rouge)
  const warningHue = (85 + (hue % 16) - 8) % 360; // Variation de ±8° autour de 85° (jaune)

  return {
    primary: hue.toString(),
    secondary: secondaryHue.toString(),
    accent: accentHue.toString(),
    valid: validHue.toString(),
    error: errorHue.toString(),
    warning: warningHue.toString(),
  };
};

// Predefined themes
export const predefinedThemes: ThemeOption[] = [
  {
    id: "default",
    name: "Défaut",
    colors: themeColorsFromHue(260), // Bleu comme couleur de base
  },
  {
    id: "ocean",
    name: "Océan",
    colors: themeColorsFromHue(195), // Bleu-vert comme couleur de base
  },
  {
    id: "sunset",
    name: "Coucher de soleil",
    colors: themeColorsFromHue(20), // Orange comme couleur de base
  },
  {
    id: "forest",
    name: "Forêt",
    colors: themeColorsFromHue(140), // Vert comme couleur de base
  },
  {
    id: "berry",
    name: "Baies",
    colors: themeColorsFromHue(320), // Rose comme couleur de base
  },
];

// Context type
type ThemeContextType = {
  currentTheme: ThemeOption;
  setTheme: (theme: ThemeOption) => void;
  setCustomTheme: (colors: ThemeColors) => void;
};

// Create context with default values
const ThemeContext = createContext<ThemeContextType>({
  currentTheme: predefinedThemes[0],
  setTheme: () => {},
  setCustomTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

// Provider component
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
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

  useEffect(() => {
    const root = document.documentElement;
    const colors = currentTheme.colors;

    for (const [key, value] of Object.entries(colors)) {
      root.style.setProperty(`--${key}-hue`, value);
    }

    localStorage.setItem("theme", JSON.stringify(currentTheme));
  }, [currentTheme]);

  const setTheme = (theme: ThemeOption) => {
    setCurrentTheme(theme);
  };

  const setCustomTheme = (colors: ThemeColors) => {
    const newTheme: ThemeOption = {
      id: "custom",
      name: "Personnalisé",
      colors: colors,
    };
    setCurrentTheme(newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setTheme,
        setCustomTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
