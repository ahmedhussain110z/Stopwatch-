import { useState, useRef, useEffect } from "react";
import "./Stopwatch.css";

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  const startTime = useRef(0);

  useEffect(() => {
    if (!running) return;

    const timer = setInterval(() => {
      setTime(Date.now() - startTime.current);
    }, 10);

    return () => clearInterval(timer);
  }, [running]);

  function start() {
    if (running) return;

    startTime.current = Date.now() - time;
    setRunning(true);
  }

  function pause() {
    setRunning(false);
  }

  function reset() {
    setRunning(false);
    setTime(0);
    setLaps([]);
  }

  function addLap() {
    setLaps((previousLaps) => [...previousLaps, time]);
  }

  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = time % 1000;

  const format = (value, digits = 2) =>
    String(value).padStart(digits, "0");

  return (
    <div className="stopwatch">

      <h1>React Stopwatch</h1>

      <div className="time-display">
        {format(minutes)}:
        {format(seconds)}.
        <span>{format(milliseconds, 3)}</span>
      </div>

      <div className="buttons">

        <button onClick={start} disabled={running}>
          Start
        </button>

        <button onClick={pause} disabled={!running}>
          Pause
        </button>

        <button onClick={reset}>
          Reset
        </button>

        <button onClick={addLap} disabled={!running}>
          Lap
        </button>

      </div>

      <div className="laps">
        <h2>Lap Records</h2>

        {laps.map((lap, index) => (
          <p key={index}>
            Lap {index + 1}:{" "}
            {format(Math.floor(lap / 60000))}:
            {format(Math.floor((lap % 60000) / 1000))}.
            {format(lap % 1000, 3)}
          </p>
        ))}
      </div>

    </div>
  );
}

export default Stopwatch;