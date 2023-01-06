const findClosestSnap = (
  n: number,
  snapArray: number[],
  snapGap: number = 0
): number => {
  const closestGapIndex = snapArray.reduce(
    (prev, curr, index) =>
      Math.abs(curr - n) < Math.abs(snapArray[prev] - n) ? index : prev,
    0
  );
  const gap = Math.abs(snapArray[closestGapIndex] - n);

  return snapGap === 0 || gap < snapGap ? snapArray[closestGapIndex] : n;
};

export default findClosestSnap;
