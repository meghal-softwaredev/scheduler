import { useState } from 'react';

// useVisualMode() hook sets mode and perform transition of appointment from one state to another
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //transition to next mode
  const transition = (newMode, replace = false) => {
      setMode(newMode);
      if (replace) {
        setHistory(prev => [...prev.slice(0, prev.length - 1), newMode]);
      } else {
        setHistory(prev => [...prev, newMode]);
      }
  }
  //transition back to previous mode
  const back = () => {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory(prev => [...prev.slice(0, prev.length - 1)]);
    }
  }

  return { mode, transition, back };
}

