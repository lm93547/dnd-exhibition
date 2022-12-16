import { Flex, Image } from "@chakra-ui/react";
import { Dispatch, RefObject, SetStateAction, SyntheticEvent, useEffect, useRef, useState,  } from "react";
import Draggable from "react-draggable";
import { DraggableData, DraggableEvent } from "react-draggable";
import { Flower, Positions } from "../globals";
import DraggableButtons from "./DraggableButtons";
import { ResizableBox, ResizeCallbackData, ResizeHandle } from "react-resizable";
import { ChevronRightIcon } from "@chakra-ui/icons";
import "../../node_modules/react-resizable/css/styles.css";
import "../style.css"

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
  const [imageSize, setImageSize] = useState({ width: 200, height: 200 });

  const nodeRef = useRef(null);

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
    savedPositions[itemId] = { x: 0, y: 0 };
    savedPositions[itemId]["x"] = dragElement.x;
    savedPositions[itemId]["y"] = dragElement.y;
    setPositions(savedPositions);
  };

  const onResize = (event: SyntheticEvent<Element, Event>, { size }: ResizeCallbackData): void => {
    setImageSize({ width: size.width, height: size.height });
  };

  const renderHandles = (resizeHandle: ResizeHandle, ref: RefObject<SVGSVGElement>): JSX.Element => {
    return <ChevronRightIcon className={`custom-handle custom-handle-${resizeHandle}`} ref={ref} />;
  };

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
      <ResizableBox
        onResize={onResize}
        handle={(handleLocations, ref) => renderHandles(handleLocations, ref)}
        width={imageSize.width}
        height={imageSize.height}
        minConstraints={[100, 100]}
        maxConstraints={[300, 300]}
        resizeHandles={['sw', 'se', 'nw', 'ne']}
        className={toolbarOpacity === "1" ? "resize" : "resize-hidden"}
      >
        <span>
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
              height={imageSize.height}
              width={imageSize.width}
              objectFit={"contain"}
              objectPosition={"center"}
              pointerEvents="none"
            />
          </Flex>
        </span>
      </ResizableBox>
    </Draggable>
  );
};

export default DraggableComponent;
