import getPixelSize from "./getPixelSize";

const calculateNewMax = (
  parentSize: { width: number; height: number },
  innerWidth: number,
  innerHeight: number,
  maxWidth?: string | number,
  maxHeight?: string | number,
  minWidth?: string | number,
  minHeight?: string | number
) => {
  maxWidth = getPixelSize(maxWidth, parentSize.width, innerWidth, innerHeight);
  maxHeight = getPixelSize(
    maxHeight,
    parentSize.height,
    innerWidth,
    innerHeight
  );
  minWidth = getPixelSize(minWidth, parentSize.width, innerWidth, innerHeight);
  minHeight = getPixelSize(
    minHeight,
    parentSize.height,
    innerWidth,
    innerHeight
  );
  return {
    maxWidth: typeof maxWidth === "undefined" ? undefined : Number(maxWidth),
    maxHeight: typeof maxHeight === "undefined" ? undefined : Number(maxHeight),
    minWidth: typeof minWidth === "undefined" ? undefined : Number(minWidth),
    minHeight: typeof minHeight === "undefined" ? undefined : Number(minHeight),
  };
};

export default calculateNewMax