const getPixelSize = (
  size: undefined | string | number,
  parentSize: number,
  innerWidth: number,
  innerHeight: number
) => {
  if (size && typeof size === "string") {
    if (size.endsWith("px")) {
      return Number(size.replace("px", ""));
    }
    if (size.endsWith("%")) {
      const ratio = Number(size.replace("%", "")) / 100;
      return parentSize * ratio;
    }
    if (size.endsWith("vw")) {
      const ratio = Number(size.replace("vw", "")) / 100;
      return innerWidth * ratio;
    }
    if (size.endsWith("vh")) {
      const ratio = Number(size.replace("vh", "")) / 100;
      return innerHeight * ratio;
    }
  }
  return size;
};

export default getPixelSize