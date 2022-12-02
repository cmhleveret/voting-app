const getTimeLeft = (endTime) => {
  return endTime - Date.now();
};

export const getCountdownAsString = (timeLeft) => {
  const days = Math.floor(timeLeft / 86400000);
  const hours = Math.floor((timeLeft - days * 86400000) / 3600000);
  const minutes = Math.floor(
    (timeLeft - hours * 3600000 - days * 86400000) / 60000
  );
  const seconds = Math.floor(
    (timeLeft - minutes * 60000 - hours * 3600000 - days * 86400000) / 1000
  );
  return `${days}D : ${hours}H : ${minutes}M : ${seconds}S`;
};

export const getCountdown = (endTime) => {
  const timeLeft = getTimeLeft(endTime);
  return getCountdownAsString(timeLeft);
}
