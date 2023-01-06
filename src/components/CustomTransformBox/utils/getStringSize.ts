const getStringSize = (n: number | string): string => {
  n = n.toString();
  if (n === "auto") {
    return n;
  }
  if (n.endsWith("px")) {
    return n;
  }
  if (n.endsWith("%")) {
    return n;
  }
  if (n.endsWith("vh")) {
    return n;
  }
  if (n.endsWith("vw")) {
    return n;
  }
  if (n.endsWith("vmax")) {
    return n;
  }
  if (n.endsWith("vmin")) {
    return n;
  }
  return `${n}px`;
};

export default getStringSize