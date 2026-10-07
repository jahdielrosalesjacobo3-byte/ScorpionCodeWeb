import { useState, useEffect } from "react";

interface UseTypewriterOptions {
  speed?: number; // Milliseconds per character
  delay?: number; // Initial delay in milliseconds before typing begins
  onComplete?: () => void;
}

/**
 * Custom hook to simulate real-time terminal typewriter effect for text strings.
 */
export function useTypewriter(
  text: string,
  options: UseTypewriterOptions = {}
) {
  const { speed = 20, delay = 300, onComplete } = options;
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;
    let currentIndex = 0;

    setDisplayedText("");
    setIsComplete(false);
    setIsTyping(false);

    timeoutId = setTimeout(() => {
      setIsTyping(true);
      intervalId = setInterval(() => {
        currentIndex++;
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
        } else {
          clearInterval(intervalId);
          setIsTyping(false);
          setIsComplete(true);
          if (onComplete) {
            onComplete();
          }
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, speed, delay]);

  return { displayedText, isTyping, isComplete };
}
