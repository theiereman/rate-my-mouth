import { ReactNode, useMemo } from "react";

// Import des strokes SVG
import stroke2 from "../../assets/images/stroke_2.svg";
import stroke3 from "../../assets/images/stroke_3.svg";
import stroke4 from "../../assets/images/stroke_4.svg";
import stroke5 from "../../assets/images/stroke_5.svg";
import stroke6 from "../../assets/images/stroke_6.svg";

type StrokeVariant = 1 | 2 | 3 | 4 | 5 | "random";
type StrokeColor = "primary" | "secondary" | "accent" | "neutral" | "custom";

interface UnderlineTextProps {
  children: ReactNode;
  stroke?: StrokeVariant;
  color?: StrokeColor;
  customColor?: string;
  className?: string;
  strokeClassName?: string;
  strokeOpacity?: number;
  strokeScale?: number;
  offset?: number;
}

const strokes = {
  1: stroke2,
  2: stroke3,
  3: stroke4,
  4: stroke5,
  5: stroke6,
};

const getRandomStroke = () => {
  const strokeNumbers = [1, 2, 3, 4, 5] as const;
  return strokeNumbers[Math.floor(Math.random() * strokeNumbers.length)];
};

const getTailwindColor = (color: StrokeColor) => {
  switch (color) {
    case "primary":
      return "oklch(0.65 0.18 var(--primary-hue, 230))";
    case "secondary":
      return "oklch(0.65 0.18 var(--secondary-hue, 300))";
    case "accent":
      return "oklch(0.65 0.18 var(--accent-hue, 270))";
    case "neutral":
      return "oklch(0.554 0.046 257.417)"; // neutral-500
    default:
      return "oklch(0.65 0.18 var(--primary-hue, 230))";
  }
};

export const UnderlineText = ({
  children,
  stroke = "random",
  color = "primary",
  customColor,
  className = "",
  strokeClassName = "",
  strokeOpacity = 0.8,
  strokeScale = 1,
  offset = 6,
}: UnderlineTextProps) => {
  // Mémoriser la stroke sélectionnée pour éviter qu'elle change à chaque re-render
  const selectedStroke = useMemo(() => {
    return stroke === "random" ? getRandomStroke() : stroke;
  }, [stroke]);

  const strokeSrc = strokes[selectedStroke];

  const strokeStyle = customColor
    ? {
        filter: `opacity(${strokeOpacity})`,
        opacity: strokeOpacity,
        WebkitMask: `url(${strokeSrc}) no-repeat center`,
        mask: `url(${strokeSrc}) no-repeat center`,
        WebkitMaskSize: "100% auto",
        maskSize: "100% auto",
        backgroundColor: customColor,
      }
    : {
        filter: `opacity(${strokeOpacity})`,
        opacity: strokeOpacity,
        WebkitMask: `url(${strokeSrc}) no-repeat center`,
        mask: `url(${strokeSrc}) no-repeat center`,
        WebkitMaskSize: "100% auto",
        maskSize: "100% auto",
        backgroundColor: getTailwindColor(color),
      };

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <div
        className={`absolute left-0 w-full h-auto pointer-events-none ${strokeClassName}`}
        style={{
          ...strokeStyle,
          bottom: `${offset}px`,
          transform: `scaleX(${strokeScale})`,
          transformOrigin: "center bottom",
          height: "20px",
        }}
        aria-hidden="true"
      />
    </span>
  );
};

export default UnderlineText;
