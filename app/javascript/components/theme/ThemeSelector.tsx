import React, { useState } from "react";
import {
  useTheme,
  predefinedThemes,
  ThemeColors,
  calculateTriad,
} from "../../contexts/ThemeContext";
import { Card } from "../ui";

// Fonction pour convertir HSL en hexadécimal
const hslToHex = (h: number, s: number, l: number): string => {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

// Fonction pour convertir hexadécimal en teinte (hue)
const hexToHue = (hex: string): number => {
  // Enlever le # si présent
  hex = hex.replace(/^#/, "");

  // Convertir en RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  // Calculer la teinte
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;

  if (max === min) {
    h = 0; // achromatic
  } else {
    const d = max - min;
    if (max === r) {
      h = (g - b) / d + (g < b ? 6 : 0);
    } else if (max === g) {
      h = (b - r) / d + 2;
    } else if (max === b) {
      h = (r - g) / d + 4;
    }
    h *= 60;
  }

  return Math.round(h);
};

export default function ThemeSelector() {
  const {
    currentTheme,
    setTheme,
    customTheme,
    setCustomTheme,
    applyCustomTheme,
  } = useTheme();

  // Initialize custom colors from current theme if not set
  const [customColors, setCustomColors] = useState<ThemeColors>(
    customTheme || currentTheme.colors
  );

  // Handle color change for custom theme
  const handleColorChange = (value: string) => {
    // Utiliser la fonction calculateTriad pour générer une triade harmonieuse
    const newColors = calculateTriad(parseInt(value, 10));
    setCustomColors(newColors);
    setCustomTheme(newColors);
  };

  // Apply custom theme
  const handleApplyCustomTheme = () => {
    applyCustomTheme();
  };

  return (
    <div className="py-2">
      <h3 className="px-4 text-sm font-medium text-neutral-700 mb-2">
        Thème de couleurs
      </h3>

      {/* Predefined themes */}
      <div className="px-4 mb-3">
        <div className="grid grid-cols-5 gap-2">
          {predefinedThemes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => {
                // Use calculateTriad to ensure we get all colors including semantic ones
                const colors = calculateTriad(
                  parseInt(theme.colors.primary, 10)
                );
                setCustomColors(colors);
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
      </div>

      {/* Custom color picker */}
      <Card variant="flat" className="mx-2 mt-2 mb-1" padding="sm">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-neutral-700">
              Couleur personnalisée (triade)
            </label>
            <div className="flex items-center mb-2">
              <input
                type="range"
                min="0"
                max="360"
                value={customColors.primary}
                onChange={(e) => {
                  handleColorChange(e.target.value);
                  handleApplyCustomTheme();
                }}
                className="flex-1 mr-2 accent-primary-600"
              />
            </div>
            <div className="flex h-3 items-stretch gap-1 text-xs text-neutral-500">
              <div
                className="rounded-full flex-1"
                style={{
                  backgroundColor: `oklch(0.75 0.2 ${customColors.primary})`,
                }}
                title="Couleur primaire"
              ></div>
              <div
                className="rounded-full flex-1"
                style={{
                  backgroundColor: `oklch(0.75 0.2 ${customColors.secondary})`,
                }}
                title="Couleur secondaire"
              ></div>
              <div
                className="rounded-full flex-1"
                style={{
                  backgroundColor: `oklch(0.75 0.2 ${customColors.accent})`,
                }}
                title="Couleur d'accent"
              ></div>
            </div>

            {/* Semantic colors preview */}
            <div className="mt-3">
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                Couleurs sémantiques
              </label>
              <div className="flex h-3 items-stretch gap-1">
                <div
                  className="rounded-full flex-1"
                  style={{
                    backgroundColor: `oklch(0.75 0.2 ${customColors.valid})`,
                  }}
                  title="Valid (vert)"
                ></div>
                <div
                  className="rounded-full flex-1"
                  style={{
                    backgroundColor: `oklch(0.75 0.2 ${customColors.error})`,
                  }}
                  title="Error (rouge)"
                ></div>
                <div
                  className="rounded-full flex-1"
                  style={{
                    backgroundColor: `oklch(0.75 0.2 ${customColors.warning})`,
                  }}
                  title="Warning (jaune)"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
