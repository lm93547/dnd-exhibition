import { DragHandleIcon, DeleteIcon } from "@chakra-ui/icons";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import Draggable from "react-draggable";
import {DraggableData, DraggableEvent} from "react-draggable"
import { Flower } from "../App";

type Props = {
  imageSource: string;
  imageTitle: string;
  setPositions: Dispatch<SetStateAction<{}>>;
  positions: any;
  exhibitionState: Flower[];
  setExhibitionState: Dispatch<SetStateAction<Flower[]>>
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
  const nodeRef = useRef(null);

  const handleDelete = (imageTitle: string):void => {
    const newExhibitionState = exhibitionState.filter((flowerItem) => flowerItem.title !== imageTitle)
    setExhibitionState(newExhibitionState)
  }

  const handleStop = (event: DraggableEvent, dragElement: DraggableData, id: string) => {
    setX(dragElement.x);
    setY(dragElement.y);
    let savedPositions = { ...positions };
    const itemId = id;
    savedPositions[itemId] = {};
    savedPositions[itemId]["x"] = dragElement.x;
    savedPositions[itemId]["y"] = dragElement.y;
    setPositions(savedPositions);
  };

  return (
    <Draggable
      position={{ x: positions[imageTitle] ? positions[imageTitle].x : x, y: positions[imageTitle] ? positions[imageTitle].y : y }}
      axis="both"
      handle=".handle"
      grid={[5, 5]}
      scale={1}
      onStop={(e, dragElement) => handleStop(e, dragElement, imageTitle)}
      key={imageTitle}
      ref={nodeRef}
      defaultPosition={{ x: positions[imageTitle] ? positions[imageTitle].x : 0, y: positions[imageTitle] ? positions[imageTitle].y : 0 }}
    >
      <div
        style={{ border: "solid 1px black", height: "fit-content" }}
        key={imageTitle}
        ref={nodeRef}
        id={imageTitle}
      >
        <div style={{display: "flex"}} >
          <div className="handle">
            <DragHandleIcon />
          </div>
          <div onClick={()=> handleDelete(imageTitle)}>
            <DeleteIcon />
          </div>
        </div>
        
        <img
          src={imageSource}
          width="200px"
          height="200px"
          style={{
            maxHeight: "200px",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>
    </Draggable>
  );
};

export default DraggableComponent;
