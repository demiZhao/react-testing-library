import React, { createContext, useState, useEffect } from "react";
import { DigitalClock, AnalogClock } from "./clock";
import "./styles.scss";

export const TimeContext = createContext();

const App = () => {
  const initTime = () => new Date().getTime();
  const [time, setTime] = useState(initTime());

  useEffect(() => {
    const handleTick = () => {
      setTime(time + 1000);
    };
    const interval = setInterval(handleTick, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [time]);

  return (
    <TimeContext.Provider value={{ time, setTime }}>
      <div className="App">
        <AnalogClock title="Analog" />
        <DigitalClock title="Digital" />
      </div>
    </TimeContext.Provider>
  );
};

export default App;
