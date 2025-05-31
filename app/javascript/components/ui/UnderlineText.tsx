import { ReactNode, useMemo } from "react";

import stroke2 from "../../assets/images/stroke_2.svg";
import stroke3 from "../../assets/images/stroke_3.svg";
import stroke4 from "../../assets/images/stroke_4.svg";
import stroke5 from "../../assets/images/stroke_5.svg";
import stroke6 from "../../assets/images/stroke_6.svg";

type StrokeVariant = 1 | 2 | 3 | 4 | 5 | "random";

interface UnderlineTextProps {
  children: ReactNode;
  stroke?: StrokeVariant;
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

export const UnderlineText = ({
  children,
  stroke = "random",
  offset = 0,
}: UnderlineTextProps) => {
  const selectedStroke = useMemo(() => {
    return stroke === "random" ? getRandomStroke() : stroke;
  }, [stroke]);

  const strokeSrc = strokes[selectedStroke];

  const strokeStyle = {
    mask: `url(${strokeSrc}) no-repeat center`,
  };

  return (
    <div className="relative inline-block">
      <span className="z-10">{children}</span>
      <div
        className={`absolute left-0 w-full h-3 pointer-events-none bg-primary-500`}
        style={{
          ...strokeStyle,
          bottom: `${offset}px`,
        }}
        aria-hidden="true"
      />
    </div>
  );
};

export default UnderlineText;
