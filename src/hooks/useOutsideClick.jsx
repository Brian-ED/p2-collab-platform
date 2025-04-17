import { useEffect } from "react";

export function useOutsideClick(ref, callback, when = true) {
  useEffect(() => {
    if (!when) return;

    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClick);

    // Remove the event listener when the component unmounts or the dependencies change
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, callback, when]);
}
