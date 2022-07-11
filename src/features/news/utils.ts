export const minutosPasados = (n: Date) => {
  const tiempo = new Date();
  return Math.floor((tiempo.getTime() - n.getTime()) / 60000);
};

export const upperCaseWords = (n: string) => {
  return n
    .split(" ")
    .map((string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    })
    .join(" ");
};
