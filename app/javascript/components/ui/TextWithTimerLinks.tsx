import { useTimer } from "@contexts/TimerContext";

interface TextWithTimerLinksProps {
  text: string;
  className?: string;
}

export default function TextWithTimerLinks({
  text,
  className = "",
}: TextWithTimerLinksProps) {
  const { setTime } = useTimer();

  const timeRegex =
    /\b(\d+)\s*(h|heures?|min|minutes?|s|sec|secondes?)(?:\s*(\d+)(?:\s*(min|minutes?|s|sec|secondes?))?)?\b/gi;

  const parseTimeMatch = (match: RegExpMatchArray) => {
    const [fullMatch, number1, unit1, number2, unit2] = match;
    let hours = 0,
      minutes = 0,
      seconds = 0;

    const value1 = parseInt(number1);
    const normalizedUnit1 = unit1.toLowerCase();

    // Premier nombre/unité
    if (normalizedUnit1.startsWith("h")) {
      hours = value1;
    } else if (normalizedUnit1.startsWith("min")) {
      minutes = value1;
    } else if (normalizedUnit1.startsWith("s")) {
      seconds = value1;
    }

    // Deuxième nombre/unité
    if (number2) {
      const value2 = parseInt(number2);

      if (unit2) {
        // Unité explicite
        const normalizedUnit2 = unit2.toLowerCase();
        if (normalizedUnit2.startsWith("min")) {
          minutes += value2;
        } else if (normalizedUnit2.startsWith("s")) {
          seconds += value2;
        }
      } else {
        // Unité implicite basée sur la première unité
        if (normalizedUnit1.startsWith("h")) {
          minutes += value2; // 1h30 = 1h + 30min
        } else if (normalizedUnit1.startsWith("min")) {
          seconds += value2; // 5min30 = 5min + 30s
        }
      }
    }

    return { hours, minutes, seconds, fullMatch };
  };

  const scrollToTimer = () => {
    const timerElement = document.querySelector('[data-timer="true"]');

    if (timerElement) {
      timerElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const handleTimerClick = (
    hours: number,
    minutes: number,
    seconds: number
  ) => {
    setTime(hours, minutes, seconds);
    scrollToTimer();
  };

  const renderTextWithLinks = () => {
    const parts = [];
    let lastIndex = 0;
    let match;

    timeRegex.lastIndex = 0;

    while ((match = timeRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }

      const { hours, minutes, seconds, fullMatch } = parseTimeMatch(match);

      parts.push(
        <button
          key={match.index}
          onClick={() => handleTimerClick(hours, minutes, seconds)}
          className="text-primary-600 hover:text-primary-700 underline decoration-dotted hover:decoration-solid cursor-pointer transition-colors me-1"
          title={`Ajouter ${hours}h ${minutes}min ${seconds}s au minuteur`}
        >
          {fullMatch}
        </button>
      );

      lastIndex = match.index + fullMatch.length;
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts.length > 0 ? parts : [text];
  };

  return <span className={className}>{renderTextWithLinks()}</span>;
}
