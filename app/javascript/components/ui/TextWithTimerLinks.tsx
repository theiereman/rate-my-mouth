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
    /(\d+)\s*(?:heures?|h)\s*(?:(\d+)\s*(?:minutes?|min))?\s*(?:(\d+)\s*(?:secondes?|s))?|(\d+)\s*(?:minutes?|min)\s*(?:(\d+)\s*(?:secondes?|s))?|(\d+)\s*(?:secondes?|s)/gi;

  const parseTimeMatch = (match: RegExpMatchArray) => {
    const [fullMatch] = match;
    let hours = 0,
      minutes = 0,
      seconds = 0;

    if (match[1]) {
      hours = parseInt(match[1]);
      minutes = match[2] ? parseInt(match[2]) : 0;
      seconds = match[3] ? parseInt(match[3]) : 0;
    } else if (match[4]) {
      minutes = parseInt(match[4]);
      seconds = match[5] ? parseInt(match[5]) : 0;
    } else if (match[6]) {
      seconds = parseInt(match[6]);
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
