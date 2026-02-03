import React from 'react';
import { useTimer } from 'react-timer-hook';

export function VoteTimer({ expiryTimestamp, onExpire, onRestart, onStart }) {
  const {
    seconds,
    minutes,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ autoStart: false, expiryTimestamp, onExpire: () => onExpire(), interval: 20 });


  return (
    <div style={{textAlign: 'center'}}>
      <div style={{fontSize: '100px'}}>
        <span>{minutes}</span>:
        {seconds < 10 ? <span>0{seconds}</span> : <span>{seconds}</span>}
      </div>
      <button onClick={() => {
        const time = new Date();
        time.setSeconds(time.getSeconds() + 300);
        start(time);
        onStart();
      }}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={resume}>Resume</button>
      <button onClick={() => {
        // Restarts to 5 minutes timer
        const time = new Date();
        time.setSeconds(time.getSeconds() + 300);
        restart(time, false); // Do not start timer after restart
        onRestart();
      }}>Restart</button>
    </div>
  );
}