import { useEffect, useState } from "react"
import { getCountdown } from "./timer"

const Countdown = ({ endTime }) => {

  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getCountdown(endTime))
    }, 1000);
    return () => {
      clearInterval(interval);
    }
  }, [])

  return (
    <div className = "timerDiv">{timeLeft}</div>
  )
};

export default Countdown;