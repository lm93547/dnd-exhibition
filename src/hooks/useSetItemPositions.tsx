import { useEffect } from "react";
import { Flower, Positions, UseSetItemPositionsArgs } from "../globals";

const useSetItemPositions = ({
  positions: { state: positionState, setPositions },
  exhibition: { state: eState, setExhibitionState },
}: UseSetItemPositionsArgs) => {
  useEffect(() => {
    const existingDivPositions: Positions = JSON.parse(
      localStorage.getItem("positions_div") as string
    );

    const existingItemPositions: Flower[] = JSON.parse(
      localStorage.getItem("items_in_exhibition") as string
    );

    if (existingDivPositions) {
      setPositions(existingDivPositions);
    }
    if (existingItemPositions) {
      setExhibitionState(existingItemPositions);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(`positions_div`, JSON.stringify(positionState));
  }, [positionState]);

  useEffect(() => {
    localStorage.setItem(
      `items_in_exhibition`,
      JSON.stringify(eState)
    );
  }, [eState]);
};

export default useSetItemPositions;
