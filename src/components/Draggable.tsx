import { Flex, Image } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { DraggableData, DraggableEvent } from "react-draggable";
import { Flower, Positions } from "../globals";
import useWindowSize from "../hooks/useWindowSize";
import DraggableButtons from "./DraggableButtons";

type Props = {
  imageSource: string;
  imageTitle: string;
  setPositions: Dispatch<SetStateAction<{}>>;
  positions: Positions;
  exhibitionState: Flower[];
  setExhibitionState: Dispatch<SetStateAction<Flower[]>>;
};

const DraggableComponent = ({
  imageSource,
  imageTitle,
  setPositions,
  positions,
  exhibitionState,
  setExhibitionState,
}: Props) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [toolbarOpacity, setToolbarOpacity] = useState<string>("0");
  const nodeRef = useRef(null);
  const windowSize = useWindowSize();

  const handleDelete = (imageTitle: string): void => {
    const newExhibitionState = exhibitionState.filter(
      (flowerItem) => flowerItem.title !== imageTitle
    );
    setExhibitionState(newExhibitionState);
  };

  const handleStop = (
    event: DraggableEvent,
    dragElement: DraggableData,
    id: string
  ) => {
    setX(dragElement.x);
    setY(dragElement.y);
    let savedPositions = { ...positions };
    const itemId = id;
    savedPositions[itemId] = {x: 0, y: 0};
    savedPositions[itemId]["x"] = dragElement.x;
    savedPositions[itemId]["y"] = dragElement.y;
    setPositions(savedPositions);
  };

  useEffect(() => {
    if(windowSize.width <= 900){
        if (positions && positions[imageTitle]) {
            let savedPositions = { ...positions };
            savedPositions[imageTitle] = {x: windowSize.width / 4, y: windowSize.height / 4};
            setPositions(savedPositions);
        }
    }
    if(windowSize.width <= 500){
        if (positions && positions[imageTitle]) {
            let savedPositions = { ...positions };
            savedPositions[imageTitle] = {x: windowSize.width / 6, y: windowSize.height / 4};
            setPositions(savedPositions);
        }
    }
  }, [windowSize]);

  return (
    <Draggable
      position={{
        x: positions[imageTitle] ? positions[imageTitle].x : x,
        y: positions[imageTitle] ? positions[imageTitle].y : y,
      }}
      axis="both"
      handle=".handle"
      grid={[5, 5]}
      scale={1}
      onStop={(e, dragElement) => handleStop(e, dragElement, imageTitle)}
      key={imageTitle}
      ref={nodeRef}
      defaultPosition={{
        x: positions[imageTitle] ? positions[imageTitle].x : 0,
        y: positions[imageTitle] ? positions[imageTitle].y : 0,
      }}
      bounds="parent"
    >
      <Flex
        border="none"
        _hover={{
          border: "solid 1px black",
          transition: "border 1s",
          cursor: "move",
        }}
        height="fit-content"
        key={imageTitle}
        ref={nodeRef}
        id={imageTitle}
        className="handle"
        onMouseOver={() => setToolbarOpacity("1")}
        onMouseOut={() => setToolbarOpacity("0")}
      >
        <DraggableButtons
          toolbarOpacity={toolbarOpacity}
          handleDelete={handleDelete}
          imageTitle={imageTitle}
        />
        <Image
          src={imageSource}
          height="200px"
          maxHeight={"200px"}
          objectFit={"contain"}
          objectPosition={"center"}
          pointerEvents="none"
        />
      </Flex>
    </Draggable>
  );
};

export default DraggableComponent;
