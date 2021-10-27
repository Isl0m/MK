export const getRandom = (max) => Math.ceil(Math.random() * max);

export const timeNow = () => {
  const date = new Date();
  const sec =
    date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
  const min =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const hour = date.getHours();
  const time = `${hour}:${min}:${sec}`;

  return time;
};
